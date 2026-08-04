/**
 * Cache layer with in-memory fallback.
 * Redis is optional and loaded only at runtime when REDIS_URL is set
 * (avoids bundling Node built-ins into Next instrumentation).
 */
type MemoryEntry = { value: string; expiresAt: number };

const memory = new Map<string, MemoryEntry>();

type RedisLike = {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, ...args: Array<string | number>) => Promise<unknown>;
  del: (key: string) => Promise<unknown>;
};

let redisClient: RedisLike | null = null;
let redisTried = false;

async function getRedis(): Promise<RedisLike | null> {
  if (!process.env.REDIS_URL) return null;
  if (redisClient) return redisClient;
  if (redisTried) return null;
  redisTried = true;

  try {
    // Runtime-only load — keep out of the Next/webpack graph.
    const req = eval("require") as NodeRequire;
    const Redis = req("ioredis");
    const client = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
    });
    await client.connect().catch(() => undefined);
    redisClient = client as RedisLike;
    return redisClient;
  } catch {
    return null;
  }
}

export async function cacheGet(key: string): Promise<string | null> {
  const redis = await getRedis();
  if (redis) {
    try {
      return await redis.get(key);
    } catch {
      // fall through
    }
  }
  const hit = memory.get(key);
  if (!hit) return null;
  if (hit.expiresAt < Date.now()) {
    memory.delete(key);
    return null;
  }
  return hit.value;
}

export async function cacheSet(
  key: string,
  value: string,
  ttlSeconds = 300,
): Promise<void> {
  const redis = await getRedis();
  if (redis) {
    try {
      await redis.set(key, value, "EX", ttlSeconds);
      return;
    } catch {
      // fall through
    }
  }
  memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}

export async function cacheDel(key: string): Promise<void> {
  const redis = await getRedis();
  if (redis) {
    try {
      await redis.del(key);
    } catch {
      // ignore
    }
  }
  memory.delete(key);
}

export async function cacheGetJson<T>(key: string): Promise<T | null> {
  const raw = await cacheGet(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function cacheSetJson(
  key: string,
  value: unknown,
  ttlSeconds = 300,
): Promise<void> {
  await cacheSet(key, JSON.stringify(value), ttlSeconds);
}
