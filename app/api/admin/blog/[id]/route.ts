import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { blogPostUpdateSchema } from "@/lib/validation";
import { generateUniqueBlogSlug } from "@/lib/data/blog";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  });

  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = blogPostUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const { slug: requestedSlug, status, publishedAt, content, ...rest } = parsed.data;

  let slug: string | undefined;
  if (requestedSlug !== undefined && requestedSlug !== existing.slug) {
    slug = await generateUniqueBlogSlug(requestedSlug, id);
  }

  let nextPublishedAt = publishedAt;
  if (status === "PUBLISHED" && existing.status !== "PUBLISHED" && publishedAt === undefined) {
    nextPublishedAt = new Date();
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...rest,
      ...(slug ? { slug } : {}),
      ...(content !== undefined ? { content: sanitizeBlogHtml(content) } : {}),
      ...(status ? { status } : {}),
      ...(nextPublishedAt !== undefined ? { publishedAt: nextPublishedAt } : {}),
    },
    include: { author: { select: { id: true, name: true } } },
  });

  return NextResponse.json({ post });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { id } = await params;
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
