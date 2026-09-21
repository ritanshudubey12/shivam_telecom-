import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageCheck, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug } from "@/lib/data/products";
import { buildMetadata, productSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return buildMetadata({
    title: product.name,
    description: product.summary,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ]}
      />
      <PageHero eyebrow="Product" title={product.name} description={product.summary} />

      <section className="bg-white py-16 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {product.imageUrl ? (
              <div className="relative mb-6 flex h-72 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/60">
                <Image
                  src={product.imageUrl}
                  alt={`${product.name} - Mobile Signal Booster Equipment for Mumbai Buildings`}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-contain p-8"
                  priority
                />
              </div>
            ) : (
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <PackageCheck className="h-6 w-6" />
              </span>
            )}
            <h2 className="mt-5 font-display text-2xl font-bold text-navy">Description</h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.networks.length > 0 && (
              <>
                <h3 className="mt-8 font-display text-lg font-bold text-navy">Networks</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.networks.map((n) => (
                    <Badge key={n} variant="outline">{n}</Badge>
                  ))}
                </div>
              </>
            )}

            {product.bands.length > 0 && (
              <>
                <h3 className="mt-6 font-display text-lg font-bold text-navy">Bands</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.bands.map((b) => (
                    <Badge key={b} variant="outline">{b}</Badge>
                  ))}
                </div>
              </>
            )}

            <p className="mt-8 text-[13px] text-muted-foreground">
              Exact specifications and configuration are confirmed after a site survey based on
              your building and current signal conditions.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border p-6">
              {product.coverageArea && (
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Coverage Area
                  </p>
                  <p className="mt-1 text-sm font-medium text-navy">{product.coverageArea}</p>
                </div>
              )}
              {product.propertyType && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Suitable Property Type
                  </p>
                  <p className="mt-1 text-sm font-medium text-navy">{product.propertyType}</p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border p-6">
              <h3 className="font-display text-sm font-bold text-navy">Installation Services</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/services/mobile-signal-booster-installation"
                    className="flex items-center gap-1.5 text-[13px] font-medium text-primary-700 hover:text-primary-800"
                  >
                    Professional Installation <ArrowRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/site-survey"
                    className="flex items-center gap-1.5 text-[13px] font-medium text-primary-700 hover:text-primary-800"
                  >
                    Pre-Installation Site Survey <ArrowRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <ContactSection />

      <JsonLd
        data={productSchema({
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          path: `/products/${product.slug}`,
        })}
      />
    </>
  );
}
