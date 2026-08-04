import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/media/blur-placeholder";
import { altFromPath } from "@/lib/media/catalog";

type Props = {
  images: string[];
  title?: string;
  columns?: "2" | "3" | "4";
  priorityCount?: number;
  className?: string;
};

const colClass = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function ImageGallery({
  images,
  title,
  columns = "3",
  priorityCount = 1,
  className = "",
}: Props) {
  if (!images.length) return null;

  return (
    <section className={`space-y-5 ${className}`}>
      {title ? (
        <h2 className="font-display text-2xl text-brand-900 sm:text-3xl">{title}</h2>
      ) : null}
      <div className={`grid gap-3 ${colClass[columns]}`}>
        {images.map((src, index) => (
          <figure
            key={`${src}-${index}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-100"
          >
            <Image
              src={src}
              alt={altFromPath(src, index)}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              priority={index < priorityCount}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
