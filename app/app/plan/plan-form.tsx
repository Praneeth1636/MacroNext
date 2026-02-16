"use client";

import { createTomorrowPlan } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MacroPlan } from "@prisma/client";

const preferences = [
  { value: "LOW_CARB", label: "Low carb" },
  { value: "BALANCED", label: "Balanced" },
  { value: "HIGH_CARB", label: "High carb" },
];

export function PlanForm({
  plan,
  tomorrowStr,
}: {
  plan: MacroPlan | null;
  tomorrowStr: string;
}) {
  return (
    <Card accent>
      <CardHeader>
        <CardTitle>Tomorrow&apos;s macros</CardTitle>
        <CardDescription>Date: {tomorrowStr} (locked to tomorrow)</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createTomorrowPlan} className="space-y-4">
          <input type="hidden" name="date" value={tomorrowStr} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                name="protein"
                type="number"
                min={50}
                max={300}
                defaultValue={plan?.protein ?? 120}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                name="calories"
                type="number"
                min={1000}
                max={4000}
                defaultValue={plan?.calories ?? 2000}
                required
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Preference</Label>
            <div className="mt-2 flex gap-4">
              {preferences.map((p) => (
                <label key={p.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="preference"
                    value={p.value}
                    defaultChecked={plan?.preference === p.value || (!plan && p.value === "BALANCED")}
                    className="rounded border-[#e5e5e5] text-[#6c47ff] focus:ring-[#6c47ff]"
                  />
                  <span className="text-[14px] text-[#737373]">{p.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="mealsCount">Meals count (2–5)</Label>
            <Input
              id="mealsCount"
              name="mealsCount"
              type="number"
              min={2}
              max={5}
              defaultValue={plan?.mealsCount ?? 3}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              name="notes"
              defaultValue={plan?.notes ?? ""}
              placeholder="Optional"
              className="mt-1"
            />
          </div>
          <Button type="submit">Save plan / Generate plan</Button>
        </form>
      </CardContent>
    </Card>
  );
}
