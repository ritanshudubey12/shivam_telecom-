import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { AnalyticsScripts } from "@/components/seo/AnalyticsScripts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seoDefaults.defaultTitle,
    template: siteConfig.seoDefaults.titleTemplate,
  },
  description: siteConfig.seoDefaults.defaultDescription,
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteConfig.seoDefaults.defaultTitle,
    description: siteConfig.seoDefaults.defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.businessName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url.replace(/\/$/, "")}/images/logo.png`,
        width: 600,
        height: 600,
        alt: `${siteConfig.businessName} - Mobile Network Booster Specialists`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoDefaults.defaultTitle,
    description: siteConfig.seoDefaults.defaultDescription,
    images: [`${siteConfig.url.replace(/\/$/, "")}/images/logo.png`],
  },
  verification: siteConfig.gscVerification
    ? { google: siteConfig.gscVerification }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f47dd",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
