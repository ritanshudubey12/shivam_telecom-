import type { Metadata } from "next";
import { BlogPostFormClient } from "@/components/admin/BlogPostFormClient";

export const metadata: Metadata = { title: "New Post", robots: { index: false, follow: false } };

export default function AdminNewBlogPostPage() {
  return <BlogPostFormClient mode="create" post={null} />;
}
