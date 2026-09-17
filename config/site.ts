/**
 * Central business configuration. Change values here to rebrand or update
 * business details across the entire site (header, footer, schema.org data,
 * contact section, metadata defaults, etc).
 */

export const siteConfig = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Shivam Telecom",
  legalName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Shivam Telecom",
  tagline: "Mobile Network Booster Specialists",
  shortDescription:
    "Professional mobile signal booster installation for homes, offices, and industrial spaces across Mumbai.",

  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.signalpromumbai.example",

  phone: process.env.NEXT_PUBLIC_PHONE || "+91-9372679079",
  phoneDisplay: (process.env.NEXT_PUBLIC_PHONE || "+91-9372679079").replace(
    "+91-",
    "+91 "
  ),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "919876543210",
  email: process.env.CONTACT_EMAIL || "shivampayasi837@gmail.com",

  address: {
    streetAddress: "Office No. 462, Hanuman Nagar, Turbhe Naka, Thane – Belapur Rd",
    addressLocality: "Vashi, Navi Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400703",
    addressCountry: "IN",
  },

  serviceArea: [
    "Mumbai",
    "Navi Mumbai",
    "Thane",
    "Andheri",
    "Bandra",
    "Borivali",
    "Powai",
    "Goregaon",
    "Malad",
    "Kandivali",
    "Vile Parle",
    "Santacruz",
    "Kurla",
    "Chembur",
    "Ghatkopar",
    "Mulund",
    "Vashi",
    "Nerul",
    "Panvel",
    "Colaba",
    "Worli",
    "Lower Parel",
    "Dadar",
    "Sion",
    "BKC",
    "South Mumbai",
  ],

  businessHours: [
    { days: "Monday – Saturday", hours: "9:30 AM – 7:30 PM" },
    { days: "Sunday", hours: "By appointment" },
  ],

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Office+no.+462+Hanuman+Nagar+Turbhe+Naka+Thane+Belapur+Rd+Vashi+Navi+Mumbai+Maharashtra+400703",
  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=Office+no.+462+Hanuman+Nagar+Turbhe+Naka+Thane+Belapur+Rd+Vashi+Navi+Mumbai+Maharashtra+400703&output=embed",

  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",

  seoDefaults: {
    titleTemplate: "%s | " + (process.env.NEXT_PUBLIC_BUSINESS_NAME || "SignalPro Mumbai"),
    defaultTitle:
      "Mobile Network Booster in Mumbai | Signal Booster Installation",
    defaultDescription:
      "Get professional mobile network and signal booster solutions in Mumbai for homes, offices, commercial buildings and industrial spaces. Request a site survey.",
    ogImage: "/images/og-default.svg",
  },
} as const;

export type SiteConfig = typeof siteConfig;
