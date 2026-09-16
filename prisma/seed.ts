import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { products } from "../config/products";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.create({
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

  await seedProducts();
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

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
