import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostForEdit } from "@/lib/data/blog";
import { BlogPostFormClient } from "@/components/admin/BlogPostFormClient";

export const metadata: Metadata = { title: "Edit Post", robots: { index: false, follow: false } };

export default async function AdminEditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostForEdit(id);

  if (!post) notFound();

  return <BlogPostFormClient mode="edit" post={post} />;
}
