import "server-only";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

const PUBLIC_PAGE_SIZE = 9;

export async function getBlogPostForEdit(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  });
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
  const where: Prisma.BlogPostWhereInput = {
    status: "PUBLISHED",
    ...(category ? { category: { equals: category, mode: "insensitive" } } : {}),
  };

  try {
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

    return {
      posts,
      pagination: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
    };
  } catch (err) {
    console.error("[data/blog] Failed to load blog posts from database", err);
    return { posts: [], pagination: { page: 1, pageSize, total: 0, totalPages: 1 } };
  }
}

export type PublishedBlogPost = Awaited<
  ReturnType<typeof getPublishedBlogPosts>
>["posts"][number];

export async function getBlogPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { author: { select: { name: true } } },
    });
  } catch (err) {
    console.error("[data/blog] Failed to load blog post from database", err);
    return null;
  }
}

export type BlogPostDetail = NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>;

export async function getRelatedBlogPosts(post: { id: string; category: string | null }) {
  const base: Prisma.BlogPostWhereInput = {
    status: "PUBLISHED",
    id: { not: post.id },
  };

  try {
    if (post.category) {
      const sameCategory = await prisma.blogPost.findMany({
        where: { ...base, category: post.category },
        orderBy: { publishedAt: "desc" },
        take: 3,
      });
      if (sameCategory.length > 0) return sameCategory;
    }

    return await prisma.blogPost.findMany({
      where: base,
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch (err) {
    console.error("[data/blog] Failed to load related blog posts from database", err);
    return [];
  }
}

export async function getAllPublishedBlogSlugsForSitemap() {
  try {
    return await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    });
  } catch (err) {
    console.error("[data/blog] Failed to load blog slugs for sitemap", err);
    return [];
  }
}

export async function getDistinctBlogCategories() {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { category: { not: null } },
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    });
    return rows.map((r) => r.category!).filter(Boolean);
  } catch (err) {
    console.error("[data/blog] Failed to load blog categories from database", err);
    return [];
  }
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
