import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogTableClient } from "@/components/admin/BlogTableClient";
import { getDistinctBlogCategories } from "@/lib/data/blog";

export const metadata: Metadata = { title: "Blog", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const categories = await getDistinctBlogCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-navy">Blog</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Write, edit and publish articles for the public blog.
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button size="sm">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>
      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
        <BlogTableClient categories={categories} />
      </Suspense>
    </div>
  );
}
