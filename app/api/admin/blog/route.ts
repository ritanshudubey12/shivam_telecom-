import { NextRequest, NextResponse } from "next/server";
import { Prisma, BlogStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { blogPostCreateSchema } from "@/lib/validation";
import { generateUniqueBlogSlug } from "@/lib/data/blog";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const search = searchParams.get("search")?.trim();
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "updatedAt_desc";

  const where: Prisma.BlogPostWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status && Object.values(BlogStatus).includes(status as BlogStatus)) {
    where.status = status as BlogStatus;
  }
  if (category) where.category = { equals: category, mode: "insensitive" };

  const [field, direction] = sort.split("_") as [string, "asc" | "desc"];
  const sortableFields = ["title", "createdAt", "updatedAt", "publishedAt"];
  const orderBy: Prisma.BlogPostOrderByWithRelationInput = {
    [sortableFields.includes(field) ? field : "updatedAt"]: direction === "asc" ? "asc" : "desc",
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { author: { select: { id: true, name: true } } },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({
    posts,
    pagination: { page, pageSize: PAGE_SIZE, total, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) },
  });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = blogPostCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { slug: requestedSlug, status, publishedAt, content, ...rest } = parsed.data;
  const slug = await generateUniqueBlogSlug(requestedSlug || parsed.data.title);

  const post = await prisma.blogPost.create({
    data: {
      ...rest,
      slug,
      content: sanitizeBlogHtml(content),
      status,
      authorId: guard.admin.id,
      publishedAt: status === "PUBLISHED" ? publishedAt ?? new Date() : publishedAt ?? null,
    },
    include: { author: { select: { id: true, name: true } } },
  });

  return NextResponse.json({ post });
}
