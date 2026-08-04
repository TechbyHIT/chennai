import type { RobotsDirectives } from "@/types/seo";

export function generateRobots(indexable: boolean): RobotsDirectives {
  return {
    index: indexable,
    follow: true,
    googleBot: {
      index: indexable,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}
