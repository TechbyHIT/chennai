export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  mega?: "services" | "areas";
};

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Invisible Grills", href: "/services/invisible-grills/" },
  { label: "Safety Nets", href: "/services/safety-nets/" },
  { label: "Services", href: "/services/", mega: "services" },
  { label: "Projects", href: "/gallery/" },
  { label: "Service Areas", href: "/locations/", mega: "areas" },
  { label: "Contact", href: "/contact/" },
];

export const FOOTER_COMPANY_LINKS: NavItem[] = [
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Projects", href: "/gallery/" },
  { label: "Testimonials", href: "/testimonials/" },
];

export const FOOTER_RESOURCE_LINKS: NavItem[] = [
  { label: "FAQs", href: "/faq/" },
  { label: "Guides", href: "/guides/" },
  { label: "Blog", href: "/blog/" },
  { label: "Pricing Guide", href: "/pricing-guide/" },
  { label: "Materials Guide", href: "/materials-guide/" },
  { label: "Installation Process", href: "/installation-process/" },
  { label: "Safety Guide", href: "/safety-guide/" },
  { label: "Comparisons", href: "/solutions/" },
];

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: "Pricing Guide", href: "/pricing-guide/" },
  { label: "Materials Guide", href: "/materials-guide/" },
  { label: "Installation Process", href: "/installation-process/" },
  { label: "Safety Guide", href: "/safety-guide/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "Guides", href: "/guides/" },
  { label: "Solutions", href: "/solutions/" },
  { label: "Property Types", href: "/property-types/" },
];

export const FOOTER_POLICY_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms and Conditions", href: "/terms-and-conditions/" },
  { label: "Disclaimer", href: "/disclaimer/" },
];
