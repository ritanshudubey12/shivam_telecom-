import "server-only";
import { prisma } from "@/lib/db";
import { products as staticProducts } from "@/config/products";

function toStaticRecord(product: (typeof staticProducts)[number]) {
  return { id: product.slug, isPublished: true, createdAt: new Date(0), updatedAt: new Date(0), ...product };
}

export async function getPublishedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    if (products.length > 0) return products;
  } catch (err) {
    console.error("[data/products] Failed to load products from database, using static catalog", err);
  }
  return staticProducts.map(toStaticRecord);
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({ where: { slug, isPublished: true } });
    if (product) return product;
  } catch (err) {
    console.error("[data/products] Failed to load product from database, using static catalog", err);
  }
  const fallback = staticProducts.find((p) => p.slug === slug);
  return fallback ? toStaticRecord(fallback) : null;
}
