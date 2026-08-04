export type PublicationStatus =
  | "draft"
  | "review"
  | "published"
  | "noindex"
  | "archived";

export type BusinessAddress = {
  street: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
};
