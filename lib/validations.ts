import { z } from "zod";

const goalEnum = z.enum(["CUT", "MAINTAIN", "BULK"]);
const dietTypeEnum = z.enum(["VEG", "NONVEG", "VEGAN", "KETO", "HALAL"]);
const deliveryWindowEnum = z.enum(["MORNING", "AFTERNOON", "EVENING"]);
const preferenceEnum = z.enum(["LOW_CARB", "BALANCED", "HIGH_CARB"]);

/** Profile form: goal, diet, allergies, address, delivery window (spec) */
export const profileSchema = z.object({
  goal: goalEnum,
  dietType: dietTypeEnum,
  allergies: z.string().transform((s) =>
    s ? s.split(",").map((x) => x.trim()).filter(Boolean) : []
  ),
  addressLine1: z.string().min(1, "Address required"),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  zip: z.string().min(1, "ZIP required"),
  deliveryWindow: deliveryWindowEnum,
});

/** Tomorrow plan form: calories, protein, preference, mealsCount, notes (spec) */
export const tomorrowPlanSchema = z.object({
  calories: z.coerce.number().min(1000).max(4000),
  protein: z.coerce.number().min(50).max(300),
  preference: preferenceEnum,
  mealsCount: z.coerce.number().min(2).max(5),
  notes: z.string().optional().nullable().transform((s) => s || null),
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type TomorrowPlanInput = z.infer<typeof tomorrowPlanSchema>;
