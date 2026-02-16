import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const meals = [
  { name: "Grilled Chicken Bowl", tags: ["nonveg", "high-protein"], calories: 420, protein: 45, carbs: 28, fat: 14 },
  { name: "Veggie Buddha Bowl", tags: ["veg", "vegan"], calories: 380, protein: 12, carbs: 58, fat: 14 },
  { name: "Salmon & Greens", tags: ["nonveg", "keto"], calories: 350, protein: 38, carbs: 6, fat: 20 },
  { name: "Tofu Stir Fry", tags: ["veg", "vegan"], calories: 320, protein: 22, carbs: 24, fat: 16 },
  { name: "Turkey & Sweet Potato", tags: ["nonveg"], calories: 440, protein: 42, carbs: 42, fat: 12 },
  { name: "Lentil Dal & Rice", tags: ["veg", "vegan"], calories: 400, protein: 18, carbs: 62, fat: 8 },
  { name: "Beef & Broccoli", tags: ["nonveg"], calories: 380, protein: 36, carbs: 22, fat: 18 },
  { name: "Chickpea Curry", tags: ["veg", "vegan", "halal"], calories: 360, protein: 14, carbs: 52, fat: 12 },
  { name: "Greek Chicken Salad", tags: ["nonveg"], calories: 340, protein: 40, carbs: 12, fat: 16 },
  { name: "Keto Cauliflower Bowl", tags: ["veg", "vegan", "keto"], calories: 280, protein: 14, carbs: 12, fat: 22 },
  { name: "Shrimp & Zucchini", tags: ["nonveg", "keto"], calories: 260, protein: 32, carbs: 8, fat: 12 },
  { name: "Black Bean Burrito Bowl", tags: ["veg", "vegan"], calories: 450, protein: 20, carbs: 68, fat: 14 },
];

async function main() {
  await prisma.mealCatalog.deleteMany();
  for (const m of meals) {
    await prisma.mealCatalog.create({ data: m });
  }
  console.log("Seeded 12 meals.");
  console.log("Admin: sign up in Clerk with email admin@macronext.com to get ADMIN role.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
