import { prisma } from "./db";

const PROTEIN_TOLERANCE = 10;
const CALORIE_TOLERANCE = 150;

type DietType = "VEG" | "NONVEG" | "VEGAN" | "KETO" | "HALAL";
type Preference = "LOW_CARB" | "BALANCED" | "HIGH_CARB";

export type GeneratedMeal = {
  mealId: string;
  name: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export async function generateMeals(
  caloriesTarget: number,
  proteinTarget: number,
  mealsCount: number,
  dietType: DietType,
  allergies: string[] = []
): Promise<GeneratedMeal[]> {
  const catalog = await prisma.mealCatalog.findMany({ orderBy: { protein: "desc" } });
  const allergyLower = allergies.map((a) => a.toLowerCase());

  const filtered = catalog.filter((m) => {
    const tags = m.tags.map((t) => t.toLowerCase());
    if (dietType === "VEG" && tags.includes("nonveg")) return false;
    if (dietType === "VEGAN" && !tags.includes("vegan")) return false;
    if (dietType === "KETO" && !tags.includes("keto")) return false;
    if (dietType === "HALAL" && tags.includes("nonveg") && !tags.includes("halal")) return false;
    const nameLower = m.name.toLowerCase();
    if (allergyLower.some((a) => nameLower.includes(a))) return false;
    return true;
  });

  const toUse = filtered.length >= mealsCount ? filtered : filtered.length > 0 ? filtered : catalog;
  if (toUse.length < mealsCount) {
    return fillWithRepeats(toUse, mealsCount, caloriesTarget, proteinTarget);
  }

  const selected: (typeof toUse) = [];
  const used = new Set<string>();
  for (let i = 0; i < mealsCount; i++) {
    const pick = toUse.find((m) => !used.has(m.id)) ?? toUse[i % toUse.length];
    if (!pick) break;
    used.add(pick.id);
    selected.push(pick);
  }

  const result = adjustServings(selected, caloriesTarget, proteinTarget);
  return result;
}

function fillWithRepeats(
  meals: Awaited<ReturnType<typeof prisma.mealCatalog.findMany>>,
  count: number,
  caloriesTarget: number,
  proteinTarget: number
): GeneratedMeal[] {
  const selected: (typeof meals)[0][] = [];
  for (let i = 0; i < count; i++) {
    selected.push(meals[i % meals.length]!);
  }
  return adjustServings(selected, caloriesTarget, proteinTarget);
}

function adjustServings(
  meals: Awaited<ReturnType<typeof prisma.mealCatalog.findMany>>,
  caloriesTarget: number,
  proteinTarget: number
): GeneratedMeal[] {
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
  const totalCal = meals.reduce((s, m) => s + m.calories, 0);
  let servings = 1;
  if (totalProtein < proteinTarget) {
    servings = Math.ceil(proteinTarget / totalProtein);
  } else if (totalCal < caloriesTarget - CALORIE_TOLERANCE) {
    servings = Math.ceil(caloriesTarget / totalCal);
  }
  const result: GeneratedMeal[] = meals.map((m) => ({
    mealId: m.id,
    name: m.name,
    servings,
    calories: m.calories * servings,
    protein: m.protein * servings,
    carbs: m.carbs * servings,
    fat: m.fat * servings,
  }));

  let totCal = result.reduce((s, m) => s + m.calories, 0);
  let totPro = result.reduce((s, m) => s + m.protein, 0);

  while (totPro < proteinTarget - PROTEIN_TOLERANCE && servings < 3) {
    servings++;
    result.forEach((r, i) => {
      const m = meals[i]!;
      r.servings = servings;
      r.calories = m.calories * servings;
      r.protein = m.protein * servings;
      r.carbs = m.carbs * servings;
      r.fat = m.fat * servings;
    });
    totCal = result.reduce((s, m) => s + m.calories, 0);
    totPro = result.reduce((s, m) => s + m.protein, 0);
  }

  if (totCal > caloriesTarget + CALORIE_TOLERANCE && result.length > 0) {
    const last = result[result.length - 1]!;
    if (last.servings > 1) {
      last.servings--;
      const meal = meals[meals.length - 1]!;
      last.calories = meal.calories * last.servings;
      last.protein = meal.protein * last.servings;
      last.carbs = meal.carbs * last.servings;
      last.fat = meal.fat * last.servings;
    }
  }

  return result;
}
