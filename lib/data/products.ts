import "server-only";
import { prisma } from "@/lib/db";
import { products as staticProducts } from "@/config/products";

const DB_TIMEOUT_MS = 250;
const DB_COOLDOWN_MS = 60 * 1000;

let isDbAvailable: boolean | null = null;
let lastDbCheckTime = 0;

async function queryWithFallback<T>(
  queryFn: () => Promise<T>,
  fallbackFn: () => T
): Promise<T> {
  const now = Date.now();
  if (isDbAvailable === false && now - lastDbCheckTime < DB_COOLDOWN_MS) {
    return fallbackFn();
  }

  try {
    let timerId: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timerId = setTimeout(() => reject(new Error("DB_TIMEOUT")), DB_TIMEOUT_MS);
    });
    const result = await Promise.race([queryFn(), timeoutPromise]);
    clearTimeout(timerId!);
    isDbAvailable = true;
    lastDbCheckTime = now;
    return result;
  } catch {
    isDbAvailable = false;
    lastDbCheckTime = now;
    return fallbackFn();
  }
}

function toStaticRecord(product: (typeof staticProducts)[number]) {
  return { id: product.slug, isPublished: true, createdAt: new Date(0), updatedAt: new Date(0), ...product };
}

export async function getPublishedProducts() {
  const getFallback = () => staticProducts.map(toStaticRecord);

  return queryWithFallback(
    async () => {
      const products = await prisma.product.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
      });
      if (products.length > 0) return products;
      return getFallback();
    },
    getFallback
  );
}

export async function getProductBySlug(slug: string) {
  const getFallback = () => {
    const fallback = staticProducts.find((p) => p.slug === slug);
    return fallback ? toStaticRecord(fallback) : null;
  };

  return queryWithFallback(
    async () => {
      const product = await prisma.product.findFirst({ where: { slug, isPublished: true } });
      if (product) return product;
      return getFallback();
    },
    getFallback
  );
}
