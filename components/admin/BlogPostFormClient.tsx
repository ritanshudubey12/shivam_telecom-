"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Save, Trash2, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { blogStatusValues } from "@/lib/validation";
import { slugify, titleCase } from "@/lib/utils";
import { uploadBlogImage } from "@/lib/upload-client";
import type { BlogPostForEdit } from "@/lib/data/blog";
import type { BlogStatus } from "@prisma/client";

export function BlogPostFormClient({
  mode,
  post,
}: {
  mode: "create" | "edit";
  post: BlogPostForEdit | null;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [tagsInput, setTagsInput] = useState(post?.tags.join(", ") ?? "");
  const [status, setStatus] = useState<BlogStatus>(post?.status ?? "DRAFT");
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription ?? "");

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const onFeaturedImageFile = async (file: File) => {
    setUploadingImage(true);
    try {
      const url = await uploadBlogImage(file);
      setFeaturedImage(url);
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title,
        slug: slug || undefined,
        excerpt,
        content,
        featuredImage: featuredImage || undefined,
        category: category || undefined,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status,
        seoTitle: seoTitle || undefined,
        seoDescription: seoDescription || undefined,
      };

      const res = await fetch(
        mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${post!.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to save post");
        return;
      }

      if (mode === "create") {
        router.push(`/admin/blog/${json.post.id}`);
      } else {
        setSlug(json.post.slug);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async () => {
    if (!post) return;
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
      if (res.ok) router.push("/admin/blog");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-navy">
            {mode === "create" ? "New Post" : "Edit Post"}
          </h2>
          {slug && (
            <p className="mt-1 text-sm text-muted-foreground">
              Public URL: <span className="font-mono">/blog/{slug}</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {mode === "edit" && (
            <Button
              variant="outline"
              size="sm"
              onClick={deletePost}
              disabled={deleting}
              className="text-destructive hover:bg-destructive/5"
            >
              {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              Delete
            </Button>
          )}
          <Button size="sm" onClick={save} disabled={saving || !title || !excerpt || !content}>
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save
          </Button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => onTitleChange(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Content</Label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
            <h3 className="font-display text-sm font-bold text-navy">SEO (optional)</h3>
            <div className="space-y-1.5">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={title || "Defaults to post title"}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder={excerpt || "Defaults to excerpt"}
              />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-white p-6">
            <h3 className="font-display text-sm font-bold text-navy">Status</h3>
            <Select value={status} onValueChange={(v) => setStatus(v as BlogStatus)}>
              <SelectTrigger className="mt-3"><SelectValue /></SelectTrigger>
              <SelectContent>
                {blogStatusValues.map((s) => (
                  <SelectItem key={s} value={s}>{titleCase(s)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          <section className="rounded-2xl border border-border bg-white p-6">
            <h3 className="font-display text-sm font-bold text-navy">Featured Image</h3>
            <div className="mt-3">
              {featuredImage ? (
                <div className="relative h-36 w-full overflow-hidden rounded-xl border border-border">
                  <Image src={featuredImage} alt="" fill className="object-cover" />
                  <button
                    onClick={() => setFeaturedImage("")}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                    title="Remove"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary-300 hover:text-primary-700"
                >
                  {uploadingImage ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <ImageIcon className="h-5 w-5" />
                      <span className="text-xs font-medium">Upload image</span>
                    </>
                  )}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void onFeaturedImageFile(file);
                  e.target.value = "";
                }}
              />
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Product Guides"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="comma, separated, tags"
              />
            </div>
          </section>

          {post?.author && (
            <p className="px-1 text-xs text-muted-foreground">Author: {post.author.name}</p>
          )}
        </div>
      </div>
    </div>
  );
}
