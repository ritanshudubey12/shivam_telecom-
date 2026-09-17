import "server-only";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { staticBlogPosts, type StaticBlogPost } from "@/config/blogs";
import type { Prisma } from "@prisma/client";

const PUBLIC_PAGE_SIZE = 9;
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

function toStaticRecord(post: StaticBlogPost) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage ?? null,
    category: post.category,
    tags: post.tags,
    status: post.status,
    authorId: null,
    author: { name: post.authorName },
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    publishedAt: new Date(post.publishedAt),
    createdAt: new Date(post.publishedAt),
    updatedAt: new Date(post.updatedAt),
  };
}

export async function getBlogPostForEdit(id: string) {
  const getFallback = () => {
    const fallback = staticBlogPosts.find((p) => p.id === id);
    if (!fallback) return null;
    return {
      ...toStaticRecord(fallback),
      author: { id: "author-1", name: fallback.authorName },
    };
  };

  return queryWithFallback(
    async () => {
      const post = await prisma.blogPost.findUnique({
        where: { id },
        include: { author: { select: { id: true, name: true } } },
      });
      return post || getFallback();
    },
    getFallback
  );
}

export type BlogPostForEdit = NonNullable<Awaited<ReturnType<typeof getBlogPostForEdit>>>;

export async function getPublishedBlogPosts({
  page = 1,
  pageSize = PUBLIC_PAGE_SIZE,
  category,
}: {
  page?: number;
  pageSize?: number;
  category?: string;
} = {}) {
  const getFallback = () => {
    const filtered = staticBlogPosts
      .filter((p) => p.status === "PUBLISHED")
      .filter((p) => (category ? p.category.toLowerCase() === category.toLowerCase() : true));

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      posts: paginated.map(toStaticRecord),
      pagination: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
    };
  };

  const where: Prisma.BlogPostWhereInput = {
    status: "PUBLISHED",
    ...(category ? { category: { equals: category, mode: "insensitive" } } : {}),
  };

  return queryWithFallback(
    async () => {
      const [posts, total] = await Promise.all([
        prisma.blogPost.findMany({
          where,
          orderBy: { publishedAt: "desc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: { author: { select: { name: true } } },
        }),
        prisma.blogPost.count({ where }),
      ]);

      if (total > 0) {
        return {
          posts,
          pagination: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
        };
      }
      return getFallback();
    },
    getFallback
  );
}

export type PublishedBlogPost = Awaited<
  ReturnType<typeof getPublishedBlogPosts>
>["posts"][number];

export async function getBlogPostBySlug(slug: string) {
  const getFallback = () => {
    const fallback = staticBlogPosts.find((p) => p.slug === slug && p.status === "PUBLISHED");
    return fallback ? toStaticRecord(fallback) : null;
  };

  return queryWithFallback(
    async () => {
      const post = await prisma.blogPost.findFirst({
        where: { slug, status: "PUBLISHED" },
        include: { author: { select: { name: true } } },
      });
      return post || getFallback();
    },
    getFallback
  );
}

export type BlogPostDetail = NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>;

export async function getRelatedBlogPosts(post: { id: string; category: string | null }) {
  const getFallback = () => {
    const otherPosts = staticBlogPosts
      .filter((p) => p.status === "PUBLISHED" && p.id !== post.id && p.slug !== post.id)
      .map(toStaticRecord);

    if (post.category) {
      const sameCat = otherPosts.filter(
        (p) => p.category.toLowerCase() === post.category?.toLowerCase()
      );
      if (sameCat.length > 0) return sameCat.slice(0, 3);
    }

    return otherPosts.slice(0, 3);
  };

  const base: Prisma.BlogPostWhereInput = {
    status: "PUBLISHED",
    id: { not: post.id },
  };

  return queryWithFallback(
    async () => {
      if (post.category) {
        const sameCategory = await prisma.blogPost.findMany({
          where: { ...base, category: post.category },
          orderBy: { publishedAt: "desc" },
          take: 3,
        });
        if (sameCategory.length > 0) return sameCategory;
      }

      const posts = await prisma.blogPost.findMany({
        where: base,
        orderBy: { publishedAt: "desc" },
        take: 3,
      });
      if (posts.length > 0) return posts;
      return getFallback();
    },
    getFallback
  );
}

export async function getAllPublishedBlogSlugsForSitemap() {
  const getFallback = () =>
    staticBlogPosts
      .filter((p) => p.status === "PUBLISHED")
      .map((p) => ({
        slug: p.slug,
        updatedAt: new Date(p.updatedAt),
      }));

  return queryWithFallback(
    async () => {
      const posts = await prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      });
      if (posts.length > 0) return posts;
      return getFallback();
    },
    getFallback
  );
}

export async function getDistinctBlogCategories() {
  const getFallback = () => Array.from(new Set(staticBlogPosts.map((p) => p.category))).sort();

  return queryWithFallback(
    async () => {
      const rows = await prisma.blogPost.findMany({
        where: { category: { not: null } },
        distinct: ["category"],
        select: { category: true },
        orderBy: { category: "asc" },
      });
      if (rows.length > 0) return rows.map((r) => r.category!).filter(Boolean);
      return getFallback();
    },
    getFallback
  );
}

export async function generateUniqueBlogSlug(base: string, excludeId?: string) {
  const root = slugify(base) || "post";
  let slug = root;
  let suffix = 2;

  while (
    await prisma.blogPost.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
  ) {
    slug = `${root}-${suffix}`;
    suffix += 1;
  }

  return slug;
}
