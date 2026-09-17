import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Radio, ArrowRight, ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { Badge } from "@/components/ui/badge";
import { getPublishedBlogPosts, getDistinctBlogCategories } from "@/lib/data/blog";
import { buildMetadata } from "@/lib/seo";
import { formatDate, estimateReadingTime } from "@/lib/utils";
import { BlogCardHeaderVisual } from "@/components/blog/BlogCardVisual";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Blog | Mobile Signal Booster Tips & Guides",
  description:
    "Expert technical guides, troubleshooting advice, and Mumbai in-building mobile coverage solutions for homes, corporate offices, and industrial units.",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page: pageParam, category } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const [{ posts, pagination }, categories] = await Promise.all([
    getPublishedBlogPosts({ page, category }),
    getDistinctBlogCategories(),
  ]);

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <PageHero
        eyebrow="Telecom Knowledge Base"
        title="Signal Booster Tips, Guides & Mumbai Case Studies"
        description="Practical, engineering-backed guides on mobile network coverage, bi-directional amplifiers, antenna placement, and in-building cellular solutions."
      />

      <section className="bg-white py-14 lg:py-20">
        <div className="container">
          {/* Category Filter Pills */}
          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border/60 pb-6">
              <span className="mr-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Filter by:
              </span>
              <Link
                href="/blog"
                prefetch={true}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  !category
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-muted/70 text-navy hover:bg-muted"
                }`}
              >
                All Articles
              </Link>
              {categories.map((cat) => {
                const active = category?.toLowerCase() === cat.toLowerCase();
                return (
                  <Link
                    key={cat}
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    prefetch={true}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      active
                        ? "bg-primary-600 text-white shadow-sm"
                        : "bg-muted/70 text-navy hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              <Radio className="mx-auto mb-3 h-10 w-10 text-primary-400" />
              <p className="text-base font-medium text-navy">No articles found in this category.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try selecting a different filter or viewing all articles.
              </p>
              <Link
                href="/blog"
                prefetch={true}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    prefetch={true}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white p-0 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 cursor-pointer"
                  >
                    {post.featuredImage ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <BlogCardHeaderVisual slug={post.slug} />
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2.5 flex items-center justify-between gap-2">
                        {post.category && (
                          <Badge variant="outline" className="text-[11px] font-medium text-primary-700">
                            {post.category}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1 text-[11.5px] text-muted-foreground">
                          <Clock className="h-3 w-3" /> {estimateReadingTime(post.content)}
                        </span>
                      </div>

                      <h2 className="line-clamp-2 font-display text-[17px] font-bold leading-snug text-navy transition-colors group-hover:text-primary-700">
                        {post.title}
                      </h2>

                      <p className="mt-2.5 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishedAt && formatDate(post.publishedAt)}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-primary-600 transition-colors group-hover:text-primary-800">
                          Read Guide <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-3">
                  <Link
                    href={`/blog?page=${page - 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                    prefetch={true}
                    aria-disabled={page <= 1}
                    className={`flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium ${
                      page <= 1
                        ? "pointer-events-none opacity-40"
                        : "hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-700"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Link>
                  <span className="px-2 text-sm font-medium text-navy">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Link
                    href={`/blog?page=${page + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                    prefetch={true}
                    aria-disabled={page >= pagination.totalPages}
                    className={`flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium ${
                      page >= pagination.totalPages
                        ? "pointer-events-none opacity-40"
                        : "hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-700"
                    }`}
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
