import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@dinehub.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@dinehub.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin user created: ${admin.email}`);

  const restaurants = [
    { name: "The Grand Kitchen", address: "123 Main Street, New York, NY 10001", phone: "+1-555-0101", email: "info@grandkitchen.com", description: "Fine dining with a modern twist.", createdBy: admin.id },
    { name: "Spice Garden", address: "456 Oak Avenue, Los Angeles, CA 90001", phone: "+1-555-0102", email: "contact@spicegarden.com", description: "Authentic Indian cuisine.", createdBy: admin.id },
    { name: "Bella Italia", address: "789 Elm Boulevard, Chicago, IL 60007", phone: "+1-555-0103", email: "hello@bellaitalia.com", description: "Traditional Italian restaurant.", createdBy: admin.id },
  ];

  for (const r of restaurants) {
    await prisma.restaurant.create({ data: r });
  }

  console.log(`${restaurants.length} sample restaurants created`);
  console.log("\nAdmin credentials: admin@dinehub.com / admin123");
}

seed()
  .catch((e) => { console.error("Seeding failed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
