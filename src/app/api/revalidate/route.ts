import { resetPageRegistryCache } from "@/lib/pages/page-registry";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  resetPageRegistryCache();
  revalidatePath("/", "layout");

  return NextResponse.json({
    ok: true,
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
