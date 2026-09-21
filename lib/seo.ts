import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Strips duplicate company suffix if child page already has it,
 * preventing '... | Shivam Telecom | Shivam Telecom' when template is applied.
 */
function normalizePageTitle(rawTitle: string): string {
  const brandSuffix = ` | ${siteConfig.businessName}`;
  if (rawTitle.endsWith(brandSuffix)) {
    return rawTitle.slice(0, -brandSuffix.length).trim();
  }
  return rawTitle;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: BuildMetadataOptions): Metadata {
  const cleanPath = path.split("?")[0] || "/";
  const base = siteConfig.url.replace(/\/$/, "");
  const canonicalUrl =
    cleanPath === "/"
      ? base
      : `${base}${cleanPath.startsWith("/") ? "" : "/"}${cleanPath}`;

  const resolvedOgImage = image
    ? image.startsWith("http")
      ? image
      : `${base}${image.startsWith("/") ? "" : "/"}${image}`
    : `${base}${siteConfig.seoDefaults.ogImage.startsWith("/") ? "" : "/"}${siteConfig.seoDefaults.ogImage}`;

  const safeTitle = normalizePageTitle(title);

  return {
    title: safeTitle,
    description,
    alternates: { canonical: canonicalUrl },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      title: safeTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.businessName,
      images: [{ url: resolvedOgImage, alt: `${safeTitle} - ${siteConfig.businessName}` }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description,
      images: [resolvedOgImage],
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? `${base}/` : `${base}${item.path.startsWith("/") ? "" : "/"}${item.path}`,
    })),
  };
}

export function localBusinessSchema() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#business`,
    name: siteConfig.businessName,
    description: siteConfig.shortDescription,
    url: `${base}/`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "₹₹",
    image: `${base}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.0760",
      longitude: "72.8777",
    },
    areaServed: siteConfig.serviceArea.map((area) => ({
      "@type": "City",
      name: area,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "00:00",
        closes: "00:00",
        description: "By appointment",
      },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function organizationSchema() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: siteConfig.businessName,
    url: `${base}/`,
    logo: `${base}/images/logo.png`,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  path: string;
}) {
  const base = siteConfig.url.replace(/\/$/, "");
  const serviceUrl = service.path.startsWith("/") ? `${base}${service.path}` : `${base}/${service.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.businessName,
      "@id": `${base}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: "Mumbai",
    },
    url: serviceUrl,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  image?: string | null;
  path: string;
  publishedAt: Date;
  updatedAt: Date;
  authorName?: string | null;
}) {
  const base = siteConfig.url.replace(/\/$/, "");
  const postUrl = post.path.startsWith("/") ? `${base}${post.path}` : `${base}/${post.path}`;
  const resolvedImage = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${base}${post.image.startsWith("/") ? "" : "/"}${post.image}`
    : `${base}/images/logo.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: resolvedImage,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.authorName || siteConfig.businessName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.businessName,
      logo: {
        "@type": "ImageObject",
        url: `${base}/images/logo.png`,
      },
    },
    mainEntityOfPage: postUrl,
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  imageUrl?: string | null;
  path: string;
}) {
  const base = siteConfig.url.replace(/\/$/, "");
  const productUrl = product.path.startsWith("/") ? `${base}${product.path}` : `${base}/${product.path}`;
  const resolvedImage = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${base}${product.imageUrl.startsWith("/") ? "" : "/"}${product.imageUrl}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: resolvedImage,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: siteConfig.businessName,
    },
  };
}
