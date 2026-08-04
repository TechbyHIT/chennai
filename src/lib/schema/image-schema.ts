export function imageSchema(url: string, caption: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: url,
    caption,
  };
}
