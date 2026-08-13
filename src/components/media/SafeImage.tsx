"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { BLUR_DATA_URL } from "@/lib/media/blur-placeholder";
import { FALLBACK_IMAGE } from "@/data/homepage-images";
import { cn } from "@/lib/utils/cn";

type SafeImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  alt,
  fallbackSrc = FALLBACK_IMAGE,
  className,
  onError,
  placeholder,
  blurDataURL,
  ...rest
}: SafeImageProps) {
  const initial = typeof src === "string" && src.length > 0 ? src : fallbackSrc;
  const [current, setCurrent] = useState(initial);
  const [failed, setFailed] = useState(false);

  return (
    <Image
      {...rest}
      src={failed ? fallbackSrc : current}
      alt={alt}
      className={cn(className)}
      placeholder={placeholder ?? "blur"}
      blurDataURL={blurDataURL ?? BLUR_DATA_URL}
      onError={(event) => {
        if (!failed && current !== fallbackSrc) {
          setFailed(true);
          setCurrent(fallbackSrc);
        }
        onError?.(event);
      }}
    />
  );
}
