export type ContentModuleKey =
  | "service-introduction"
  | "local-introduction"
  | "customer-problem"
  | "service-explanation"
  | "suitable-applications"
  | "property-recommendations"
  | "benefits"
  | "features"
  | "materials"
  | "technical-specifications"
  | "installation-process"
  | "measurement-process"
  | "safety-checks"
  | "quality-checks"
  | "maintenance-guidance"
  | "durability-factors"
  | "weather-considerations"
  | "pricing-factors"
  | "common-mistakes"
  | "contractor-selection"
  | "local-service-coverage"
  | "nearby-areas"
  | "related-services"
  | "related-guides"
  | "topical-authority"
  | "faq"
  | "quotation-cta";

export type ContentModule = {
  key: ContentModuleKey;
  title: string;
  body: string;
  bullets?: string[];
  links?: Array<{ href: string; label: string }>;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type PropertyType = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  recommendations: string[];
  commonRequirements: string[];
  publicationStatus: "draft" | "review" | "published" | "noindex" | "archived";
  allowIndexing: boolean;
  contentReviewed: boolean;
  qualityScore: number;
};

export type Problem = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  detailedDescription: string;
  relatedServiceIds: string[];
  customerQuestions: string[];
  publicationStatus: "draft" | "review" | "published" | "noindex" | "archived";
  allowIndexing: boolean;
  contentReviewed: boolean;
  qualityScore: number;
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  relatedServiceIds: string[];
  faq: FAQItem[];
  publicationStatus: "draft" | "review" | "published" | "noindex" | "archived";
  allowIndexing: boolean;
  contentReviewed: boolean;
  qualityScore: number;
  wordCount: number;
  author: string;
  reviewedAt: string;
  updatedAt: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  relatedServiceIds: string[];
  relatedGuideIds: string[];
  faq: FAQItem[];
  publicationStatus: "draft" | "review" | "published" | "noindex" | "archived";
  allowIndexing: boolean;
  contentReviewed: boolean;
  qualityScore: number;
  wordCount: number;
  publishedAt: string;
  updatedAt: string;
};
