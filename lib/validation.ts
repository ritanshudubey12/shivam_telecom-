import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
const nameRegex = /^[a-zA-Z\s.'-]{2,80}$/;

export const requirementTypeValues = [
  "HOME",
  "OFFICE",
  "FACTORY",
  "WAREHOUSE",
  "HOTEL",
  "HOSPITAL",
  "COMMERCIAL_BUILDING",
  "BASEMENT",
  "OTHER",
] as const;

export const networkProviderValues = ["JIO", "AIRTEL", "VI", "BSNL", "OTHER"] as const;

export const propertyTypeValues = [
  "RESIDENTIAL",
  "OFFICE",
  "RETAIL",
  "INDUSTRIAL",
  "HOSPITALITY",
  "HEALTHCARE",
  "INSTITUTIONAL",
  "OTHER",
] as const;

export const leadSourceValues = [
  "WEBSITE_CONTACT_FORM",
  "WEBSITE_HERO_FORM",
  "WEBSITE_LOCATION_PAGE",
  "WEBSITE_SERVICE_PAGE",
  "PHONE_CALL",
  "WHATSAPP",
  "REFERRAL",
  "OTHER",
] as const;

export const leadStatusValues = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "SITE_VISIT",
  "QUOTATION_SENT",
  "WON",
  "LOST",
] as const;

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long")
    .regex(nameRegex, "Please enter a valid name"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  company: z.string().trim().max(120).optional().or(z.literal("")).transform((v) => v || undefined),
  city: z.string().trim().min(2, "City is required").max(80),
  area: z.string().trim().max(120).optional().or(z.literal("")).transform((v) => v || undefined),
  requirementType: z.enum(requirementTypeValues).default("OTHER"),
  networkProvider: z.enum(networkProviderValues).optional(),
  propertyType: z.enum(propertyTypeValues).optional(),
  propertySize: z.string().trim().max(60).optional().or(z.literal("")).transform((v) => v || undefined),
  message: z.string().trim().max(2000).optional().or(z.literal("")).transform((v) => v || undefined),
  source: z.enum(leadSourceValues).default("WEBSITE_CONTACT_FORM"),
  // Honeypot field — must stay empty. Bots that fill every field trip this.
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(80).regex(nameRegex, "Please enter a valid name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian mobile number")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  subject: z.string().trim().max(150).optional().or(z.literal("")).transform((v) => v || undefined),
  message: z.string().trim().min(10, "Please add a few more details").max(2000),
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const leadUpdateSchema = z.object({
  status: z.enum(leadStatusValues).optional(),
  assignedToId: z.string().nullable().optional(),
  name: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().email().nullable().optional(),
  phone: z.string().trim().regex(phoneRegex).optional(),
  company: z.string().trim().max(120).nullable().optional(),
  city: z.string().trim().min(2).max(80).optional(),
  area: z.string().trim().max(120).nullable().optional(),
  requirementType: z.enum(requirementTypeValues).optional(),
  networkProvider: z.enum(networkProviderValues).nullable().optional(),
  propertyType: z.enum(propertyTypeValues).nullable().optional(),
  propertySize: z.string().trim().max(60).nullable().optional(),
  message: z.string().trim().max(2000).nullable().optional(),
});

export const leadNoteSchema = z.object({
  body: z.string().trim().min(1, "Note cannot be empty").max(2000),
});

// ---------------------------------------------------------------------------
// Blog / CMS
// ---------------------------------------------------------------------------

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogStatusValues = ["DRAFT", "PUBLISHED"] as const;

export const blogPostCreateSchema = z.object({
  title: z.string().trim().min(2, "Title is too short").max(160, "Title is too long"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(slugRegex, "Slug can only contain lowercase letters, numbers and hyphens")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  excerpt: z.string().trim().min(10, "Excerpt is too short").max(300, "Excerpt is too long"),
  content: z.string().min(1, "Content cannot be empty"),
  featuredImage: z
    .string()
    .trim()
    .url("Enter a valid image URL")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  category: z.string().trim().max(60).optional().or(z.literal("")).transform((v) => v || undefined),
  tags: z.array(z.string().trim().min(1).max(30)).max(10).default([]),
  status: z.enum(blogStatusValues).default("DRAFT"),
  seoTitle: z.string().trim().max(70).optional().or(z.literal("")).transform((v) => v || undefined),
  seoDescription: z
    .string()
    .trim()
    .max(160)
    .optional()
    .or(z.literal(""))
    .transform((v) => v || undefined),
  publishedAt: z.coerce.date().optional(),
});

export type BlogPostCreateInput = z.infer<typeof blogPostCreateSchema>;

export const blogPostUpdateSchema = z.object({
  title: z.string().trim().min(2).max(160).optional(),
  slug: z.string().trim().toLowerCase().regex(slugRegex).optional(),
  excerpt: z.string().trim().min(10).max(300).optional(),
  content: z.string().min(1).optional(),
  featuredImage: z.string().trim().url().nullable().optional(),
  category: z.string().trim().max(60).nullable().optional(),
  tags: z.array(z.string().trim().min(1).max(30)).max(10).optional(),
  status: z.enum(blogStatusValues).optional(),
  seoTitle: z.string().trim().max(70).nullable().optional(),
  seoDescription: z.string().trim().max(160).nullable().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
});

export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;
