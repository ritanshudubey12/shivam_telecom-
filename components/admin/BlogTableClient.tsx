"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, ExternalLink, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogStatusBadge } from "./BlogStatusBadge";
import { formatDate, titleCase } from "@/lib/utils";
import { blogStatusValues } from "@/lib/validation";
import type { BlogPost, AdminUser } from "@prisma/client";

interface BlogPostRow extends BlogPost {
  author: Pick<AdminUser, "id" | "name"> | null;
}

interface BlogPostsResponse {
  posts: BlogPostRow[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}

export function BlogTableClient({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<BlogPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      if (key !== "page") params.delete("page");
      startTransition(() => {
        router.push(`/admin/blog?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/admin/blog?${searchParams.toString()}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [searchParams]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchInput !== (searchParams.get("search") || "")) {
        updateParam("search", searchInput);
      }
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const deletePost = async (post: BlogPostRow) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeletingId(post.id);
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
      if (res.ok) load();
    } finally {
      setDeletingId(null);
    }
  };

  const page = data?.pagination.page ?? 1;
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title, slug or excerpt"
            className="pl-9"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <Select value={searchParams.get("status") || "ALL"} onValueChange={(v) => updateParam("status", v === "ALL" ? "" : v)}>
          <SelectTrigger className="sm:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            {blogStatusValues.map((s) => (
              <SelectItem key={s} value={s}>{titleCase(s)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("category") || "ALL"}
          onValueChange={(v) => updateParam("category", v === "ALL" ? "" : v)}
        >
          <SelectTrigger className="sm:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Tags</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Author</th>
                <th className="px-5 py-3 font-semibold">Updated</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    Loading posts...
                  </td>
                </tr>
              )}
              {!loading && data?.posts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    No posts match your filters.
                  </td>
                </tr>
              )}
              {!loading &&
                data?.posts.map((post) => (
                  <tr key={post.id} className="border-b border-border/70 last:border-0 hover:bg-muted/40">
                    <td className="px-5 py-3">
                      <Link href={`/admin/blog/${post.id}`} className="font-medium text-navy hover:text-primary-700">
                        {post.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">/{post.slug}</div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{post.category || "—"}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {post.tags.length > 0 ? post.tags.join(", ") : "—"}
                    </td>
                    <td className="px-5 py-3"><BlogStatusBadge status={post.status} /></td>
                    <td className="px-5 py-3 text-muted-foreground">{post.author?.name || "—"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDate(post.updatedAt)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {post.status === "PUBLISHED" && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-navy"
                            title="View live"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <button
                          onClick={() => deletePost(post)}
                          disabled={deletingId === post.id}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {data && data.pagination.total > 0 && (
          <div className="flex items-center justify-between border-t border-border px-5 py-3 text-sm text-muted-foreground">
            <span>
              Page {page} of {totalPages} · {data.pagination.total} posts
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => updateParam("page", String(page - 1))}
                className="rounded-lg border border-border p-1.5 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => updateParam("page", String(page + 1))}
                className="rounded-lg border border-border p-1.5 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
