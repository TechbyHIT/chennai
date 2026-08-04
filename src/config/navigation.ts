export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  mega?: "services" | "areas";
};

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/", mega: "services" },
  { label: "Areas", href: "/locations/", mega: "areas" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
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
