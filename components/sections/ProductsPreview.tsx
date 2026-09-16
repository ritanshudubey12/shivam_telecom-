import Link from "next/link";
import Image from "next/image";
import { PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/config/products";

export function ProductsPreview() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="container">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-[28px]">
            Featured Products
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-xl bg-muted/60 transition-colors hover:bg-muted"
            >
              <div className="relative flex h-48 items-center justify-center bg-white">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <PackageCheck className="h-10 w-10 text-primary-300" />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-navy">{product.name}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {product.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
