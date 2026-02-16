"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateMeals } from "@/lib/meal-generator";
import { profileSchema, tomorrowPlanSchema } from "@/lib/validations";
import type { OrderStatus } from "@prisma/client";

export async function saveProfile(formData: FormData) {
  const authUser = await getAuth();
  if (!authUser?.userId) redirect("/login");

  const raw = {
    goal: formData.get("goal"),
    dietType: formData.get("dietType"),
    allergies: formData.get("allergies") ?? "",
    addressLine1: formData.get("addressLine1"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    deliveryWindow: formData.get("deliveryWindow"),
  };
  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    redirect("/app/profile?error=invalid");
  }
  const { goal, dietType, allergies, addressLine1, city, state, zip, deliveryWindow } = parsed.data;

  await prisma.profile.upsert({
    where: { userId: authUser.userId },
    create: {
      userId: authUser.userId,
      goal,
      dietType,
      allergies,
      addressLine1,
      city,
      state,
      zip,
      deliveryWindow,
    },
    update: {
      goal,
      dietType,
      allergies,
      addressLine1,
      city,
      state,
      zip,
      deliveryWindow,
    },
  });
  revalidatePath("/app/profile");
  revalidatePath("/app");
  redirect("/app");
}

export async function createTomorrowPlan(formData: FormData) {
  const authUser = await getAuth();
  if (!authUser?.userId) redirect("/login");

  const raw = {
    calories: formData.get("calories"),
    protein: formData.get("protein"),
    preference: formData.get("preference"),
    mealsCount: formData.get("mealsCount"),
    notes: formData.get("notes") ?? "",
  };
  const parsed = tomorrowPlanSchema.safeParse(raw);
  if (!parsed.success) {
    redirect("/app/plan?error=invalid");
  }
  const { calories, protein, preference, mealsCount, notes } = parsed.data;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  await prisma.macroPlan.upsert({
    where: {
      userId_date: { userId: authUser.userId, date: tomorrow },
    },
    create: {
      userId: authUser.userId,
      date: tomorrow,
      calories,
      protein,
      preference,
      mealsCount,
      notes,
    },
    update: {
      calories,
      protein,
      preference,
      mealsCount,
      notes,
    },
  });
  revalidatePath("/app/plan");
  revalidatePath("/app");
  redirect("/app/plan");
}

export async function generateOrderFromPlan() {
  const authUser = await getAuth();
  if (!authUser?.userId) redirect("/login");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const plan = await prisma.macroPlan.findUnique({
    where: { userId_date: { userId: authUser.userId, date: tomorrow } },
  });
  if (!plan) return { error: "No plan for tomorrow. Create one first." };

  const profile = await prisma.profile.findUnique({
    where: { userId: authUser.userId },
  });
  if (!profile) return { error: "Complete your profile first." };

  const generated = await generateMeals(
    plan.calories,
    plan.protein,
    plan.mealsCount,
    profile.dietType,
    profile.allergies
  );

  const totalCalories = generated.reduce((s, m) => s + m.calories, 0);
  const totalProtein = generated.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = generated.reduce((s, m) => s + m.carbs, 0);
  const totalFat = generated.reduce((s, m) => s + m.fat, 0);

  await prisma.order.create({
    data: {
      userId: authUser.userId,
      date: tomorrow,
      status: "PLACED",
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      generatedMeals: generated as object,
    },
  });
  revalidatePath("/app");
  revalidatePath("/app/plan");
  revalidatePath("/app/orders");
  return { ok: true };
}

export async function getTomorrowPlanPreview(): Promise<
  { meals: { name: string; servings: number; calories: number; protein: number }[]; totals: { calories: number; protein: number } } | { error: string }
> {
  const authUser = await getAuth();
  if (!authUser?.userId) return { error: "Not authenticated" };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const plan = await prisma.macroPlan.findUnique({
    where: { userId_date: { userId: authUser.userId, date: tomorrow } },
  });
  if (!plan) return { error: "No plan for tomorrow" };

  const profile = await prisma.profile.findUnique({
    where: { userId: authUser.userId },
  });
  if (!profile) return { error: "Complete your profile first" };

  const { generateMeals } = await import("@/lib/meal-generator");
  const generated = await generateMeals(
    plan.calories,
    plan.protein,
    plan.mealsCount,
    profile.dietType,
    profile.allergies
  );
  const totals = {
    calories: generated.reduce((s, m) => s + m.calories, 0),
    protein: generated.reduce((s, m) => s + m.protein, 0),
  };
  return {
    meals: generated.map((m) => ({ name: m.name, servings: m.servings, calories: m.calories, protein: m.protein })),
    totals,
  };
}

export async function adminUpdateOrderStatus(orderId: string, status: OrderStatus) {
  const authUser = await getAuth();
  if (authUser?.role !== "ADMIN") redirect("/app");
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
}
