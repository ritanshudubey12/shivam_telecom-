/**
 * Static product catalog — single source of truth shared by the database
 * seed script and the site's static fallback (used when no products exist
 * in the database yet, e.g. before DATABASE_URL is connected).
 */

const boosterWarrantyLine =
  "Replacement warranty 1-year. Free product demo and installation service included. Coverage area: up to 1000 sq ft per antenna.";
const compactWarrantyLine =
  "1-year product warranty. Free product demo and installation service included. Coverage area: 1000–1500 sq ft.";

export interface StaticProduct {
  slug: string;
  name: string;
  summary: string;
  description: string;
  imageUrl: string;
  bands: string[];
  networks: string[];
  coverageArea: string | null;
  propertyType: string | null;
  sortOrder: number;
}

export const products: StaticProduct[] = [
  {
    slug: "tri-band-mobile-network-booster",
    name: "Tri Band Mobile Network Booster",
    summary: boosterWarrantyLine,
    description: boosterWarrantyLine,
    imageUrl: "/images/products/tri-band-mobile-network-booster.jpg",
    bands: ["Bands vary by operator and site survey"],
    networks: ["Configured based on site requirements"],
    coverageArea: "1000 sq ft per antenna",
    propertyType: "Home, Small Office",
    sortOrder: 1,
  },
  {
    slug: "lmr-300-coaxial-cable",
    name: "LMR-400 Coaxial Cable",
    summary: boosterWarrantyLine,
    description: boosterWarrantyLine,
    imageUrl: "/images/products/lmr-300-coaxial-cable.jpg",
    bands: [],
    networks: [],
    coverageArea: null,
    propertyType: "Accessory",
    sortOrder: 2,
  },
  {
    slug: "splitter-four-way",
    name: "Splitter Four Way",
    summary: boosterWarrantyLine,
    description: boosterWarrantyLine,
    imageUrl: "/images/products/splitter-four-way.jpg",
    bands: [],
    networks: [],
    coverageArea: null,
    propertyType: "Accessory",
    sortOrder: 3,
  },
  {
    slug: "triband-mobile-network-booster-compact",
    name: "Triband Mobile Network Booster",
    summary: "GSM 900MHz / 4G 1800MHz / 3G 2100MHz. " + compactWarrantyLine,
    description: "GSM 900MHz / 4G 1800MHz / 3G 2100MHz. " + compactWarrantyLine,
    imageUrl: "/images/products/triband-mobile-network-booster-compact.jpg",
    bands: ["GSM 900MHz", "4G 1800MHz", "3G 2100MHz"],
    networks: ["Multiple operators, subject to band compatibility"],
    coverageArea: "1000–1500 sq ft",
    propertyType: "Home, Small Office",
    sortOrder: 4,
  },
  {
    slug: "dual-band-mobile-signal-booster",
    name: "Dual Band Mobile Signal Booster",
    summary: boosterWarrantyLine,
    description:
      boosterWarrantyLine +
      " Supplied as a kit with outdoor antenna, indoor antenna and coaxial cable.",
    imageUrl: "/images/products/dual-band-mobile-signal-booster.jpg",
    bands: ["Bands vary by operator and site survey"],
    networks: ["Configured based on site requirements"],
    coverageArea: "1000 sq ft per antenna",
    propertyType: "Home, Small Office",
    sortOrder: 5,
  },
  {
    slug: "triband-mobile-signal-booster",
    name: "Triband Mobile Signal Booster",
    summary: "2G/3G/4G — 900MHz/1800MHz/2100MHz. " + boosterWarrantyLine,
    description: "2G/3G/4G — 900MHz/1800MHz/2100MHz. " + boosterWarrantyLine,
    imageUrl: "/images/products/triband-mobile-signal-booster.jpg",
    bands: ["2G 900MHz", "3G 2100MHz", "4G 1800MHz"],
    networks: ["Multiple operators, subject to band compatibility"],
    coverageArea: "1000 sq ft per antenna",
    propertyType: "Home, Office",
    sortOrder: 6,
  },
  {
    slug: "patch-panel-antenna",
    name: "Patch Panel Antenna",
    summary: compactWarrantyLine,
    description: compactWarrantyLine,
    imageUrl: "/images/products/patch-panel-antenna.png",
    bands: [],
    networks: [],
    coverageArea: null,
    propertyType: "Accessory",
    sortOrder: 7,
  },
  {
    slug: "lmr-coaxial-cable-400",
    name: "LMR Coaxial Cable 400",
    summary: boosterWarrantyLine,
    description: boosterWarrantyLine,
    imageUrl: "/images/products/lmr-coaxial-cable-400.png",
    bands: [],
    networks: [],
    coverageArea: null,
    propertyType: "Accessory",
    sortOrder: 8,
  },
  {
    slug: "ceiling-omni-antenna",
    name: "Ceiling Omni Antenna",
    summary: "2G/3G/4G — 900MHz/1800MHz/2100MHz. " + boosterWarrantyLine,
    description: "2G/3G/4G — 900MHz/1800MHz/2100MHz. " + boosterWarrantyLine,
    imageUrl: "/images/products/ceiling-omni-antenna.png",
    bands: ["2G 900MHz", "3G 2100MHz", "4G 1800MHz"],
    networks: [],
    coverageArea: null,
    propertyType: "Accessory",
    sortOrder: 9,
  },
  {
    slug: "jio-triband-network-booster",
    name: "Jio Triband Network Booster",
    summary: "4G / 3G. " + compactWarrantyLine,
    description: "4G / 3G. " + compactWarrantyLine,
    imageUrl: "/images/products/jio-triband-network-booster.jpg",
    bands: ["4G", "3G"],
    networks: ["Jio"],
    coverageArea: "1000–1500 sq ft",
    propertyType: "Home, Small Office",
    sortOrder: 10,
  },
  {
    slug: "mobile-network-booster",
    name: "Mobile Network Booster",
    summary: "GSM / DCS / 3G. " + boosterWarrantyLine,
    description: "GSM / DCS / 3G. " + boosterWarrantyLine,
    imageUrl: "/images/products/mobile-network-booster.jpg",
    bands: ["GSM", "DCS", "3G"],
    networks: ["Multiple operators, subject to band compatibility"],
    coverageArea: "1000 sq ft per antenna",
    propertyType: "Home, Office",
    sortOrder: 11,
  },
  {
    slug: "big-high-gain-network-booster",
    name: "Big High Gain Network Booster",
    summary: "2G/3G/4G — 900MHz/1800MHz/2100MHz. " + boosterWarrantyLine,
    description: "2G/3G/4G — 900MHz/1800MHz/2100MHz. " + boosterWarrantyLine,
    imageUrl: "/images/products/big-high-gain-network-booster.jpg",
    bands: ["2G 900MHz", "3G 2100MHz", "4G 1800MHz"],
    networks: ["Configured based on site requirements"],
    coverageArea: "Suited to large-span spaces",
    propertyType: "Factory, Warehouse, Large Commercial",
    sortOrder: 12,
  },
];
