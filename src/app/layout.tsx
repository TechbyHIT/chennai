import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Header } from "@/components/layout/Header";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";
import { localBusinessSchema } from "@/lib/schema/local-business-schema";
import { organizationSchema } from "@/lib/schema/organization-schema";
import { websiteSchema } from "@/lib/schema/website-schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A1D37" },
    { media: "(prefers-color-scheme: dark)", color: "#061224" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: BUSINESS_CONFIG.name,
    type: "website",
    locale: SITE_CONFIG.locale,
    images: [
      {
        url: BUSINESS_CONFIG.defaultOpenGraphImage,
        width: 1200,
        height: 630,
        alt: BUSINESS_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    images: [BUSINESS_CONFIG.defaultOpenGraphImage],
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  category: "Home Safety Installation",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-brand="glory" className={`${inter.variable} ${poppins.variable}`}>
      <body className="fg-mobile-shell">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        <Header />
        <main id="main-content" className="fg-main">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <StickyMobileCta />
      </body>
    </html>
  );
}
