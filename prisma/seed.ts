import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { products } from "../config/products";
import { staticBlogPosts } from "../config/blogs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";

  let adminUser = await prisma.adminUser.findUnique({ where: { email } });
  if (adminUser) {
    console.log(`Admin user already exists: ${email}`);
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    adminUser = await prisma.adminUser.create({
      data: {
        name: "Super Admin",
        email,
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });

    console.log(`Created super admin: ${email}`);
    console.log(
      password === "ChangeMe123!"
        ? "Using default password 'ChangeMe123!' — set ADMIN_SEED_PASSWORD env var to override, and change it after first login."
        : "Password set from ADMIN_SEED_PASSWORD."
    );
  }

  await seedProducts();
  await seedBlogPosts(adminUser?.id);
}

/**
 * Product catalog matching the business owner's supplier/wholesaler
 * listing. Data lives in config/products.ts (also used as the site's
 * static fallback when the database has no products yet).
 */
async function seedProducts() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

/**
 * Seed 20 SEO-optimized blog articles into the database for the Blog CMS.
 */
async function seedBlogPosts(adminUserId?: string) {
  for (const post of staticBlogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        category: post.category,
        tags: post.tags,
        status: post.status,
        authorId: adminUserId || null,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        publishedAt: new Date(post.publishedAt),
        createdAt: new Date(post.publishedAt),
        updatedAt: new Date(post.updatedAt),
      },
    });
  }

  console.log(`Seeded ${staticBlogPosts.length} blog posts.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
