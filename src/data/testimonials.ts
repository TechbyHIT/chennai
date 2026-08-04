export type Testimonial = {
  id: string;
  name: string;
  location: string;
  service: string;
  quote: string;
  verified: boolean;
};

/** Only include real testimonials. Keep empty until verified customer quotes are available. */
export const TESTIMONIALS: Testimonial[] = [];
