import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import { buildMetadata } from "@/lib/seo";
import { formatDate, estimateReadingTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Blog | Mobile Signal Booster Tips & Guides",
  description:
    "Guides, tips and updates on mobile network boosters, signal coverage and installation for homes, offices and industrial spaces in Mumbai.",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page: pageParam, category } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, pagination } = await getPublishedBlogPosts({ page, category });

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <PageHero
        eyebrow="Blog"
        title="Signal Booster Tips & Guides"
        description="Practical guides on mobile network coverage, booster installation and choosing the right system for your property."
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              We&apos;re working on our first articles. Please check back soon.
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Card key={post.id} className="flex flex-col overflow-hidden p-0">
                    <div className="relative flex h-44 items-center justify-center bg-muted/60">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                          <Newspaper className="h-5 w-5" />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {post.category && (
                        <Badge variant="outline" className="mb-2 w-fit">
                          {post.category}
                        </Badge>
                      )}
                      <h2 className="font-display text-lg font-bold text-navy">{post.title}</h2>
                      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {post.publishedAt && formatDate(post.publishedAt)} · {estimateReadingTime(post.content)}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-4 flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-700 hover:text-primary-800"
                      >
                        Read Article <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <Link
                    href={`/blog?page=${page - 1}${category ? `&category=${category}` : ""}`}
                    aria-disabled={page <= 1}
                    className={`flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-medium ${
                      page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-muted"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Link
                    href={`/blog?page=${page + 1}${category ? `&category=${category}` : ""}`}
                    aria-disabled={page >= pagination.totalPages}
                    className={`flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-medium ${
                      page >= pagination.totalPages ? "pointer-events-none opacity-40" : "hover:bg-muted"
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
