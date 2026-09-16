import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/data/blog";
import { buildMetadata, blogPostingSchema } from "@/lib/seo";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";
import { formatDate, estimateReadingTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage ?? undefined,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post);
  const safeContent = sanitizeBlogHtml(post.content);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <section className="border-b border-border bg-muted/30 py-12 lg:py-16">
        <div className="container max-w-3xl">
          {post.category && <Badge variant="outline">{post.category}</Badge>}
          <h1 className="mt-3 text-balance font-display text-[28px] font-extrabold leading-[1.2] text-navy sm:text-[36px]">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {post.author?.name || "Team"}
            </span>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {estimateReadingTime(post.content)}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="container grid gap-12 lg:grid-cols-3">
          <article className="max-w-2xl lg:col-span-2">
            {post.featuredImage && (
              <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
                <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
              </div>
            )}
            <div
              className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-primary-700"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />

            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </article>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border p-6">
              <h3 className="font-display text-sm font-bold text-navy">Related Articles</h3>
              <ul className="mt-4 space-y-3">
                {related.length === 0 && (
                  <li className="text-[13.5px] text-muted-foreground">No related articles yet.</li>
                )}
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="flex items-center gap-1.5 text-[13.5px] font-medium text-primary-700 hover:text-primary-800"
                    >
                      {r.title} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <h3 className="font-display text-sm font-bold text-navy">Need a Site Survey?</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                Get a free, no-obligation site survey and a booster recommendation for your property.
              </p>
              <Link
                href="/contact"
                className="mt-4 flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-700 hover:text-primary-800"
              >
                Get Free Site Survey <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <ContactSection />

      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          description: post.seoDescription || post.excerpt,
          image: post.featuredImage,
          path: `/blog/${post.slug}`,
          publishedAt: post.publishedAt ?? post.createdAt,
          updatedAt: post.updatedAt,
          authorName: post.author?.name,
        })}
      />
    </>
  );
}
