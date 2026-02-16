"use client";

import { useState, useEffect } from "react";
import { getTomorrowPlanPreview, generateOrderFromPlan } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PlanPreview() {
  const [data, setData] = useState<{
    meals: { name: string; servings: number; calories: number; protein: number }[];
    totals: { calories: number; protein: number };
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    getTomorrowPlanPreview().then((res) => {
      setLoading(false);
      if ("error" in res) setError(res.error ?? "Something went wrong");
      else setData(res);
    });
  }, []);

  async function handleConfirm() {
    setConfirming(true);
    const res = await generateOrderFromPlan();
    setConfirming(false);
    if ("error" in res) {
      setError(res.error ?? "Something went wrong");
    } else {
      window.location.reload();
    }
  }

  if (loading) return <div className="text-[14px] text-[#737373]">Loading preview…</div>;
  if (error) return <div className="rounded-[16px] border border-[#dc2626]/30 bg-[#fef2f2] px-4 py-3 text-[14px] text-[#dc2626]">{error}</div>;
  if (!data) return null;

  return (
    <Card accent>
      <CardHeader>
        <CardTitle>Tomorrow&apos;s plan preview</CardTitle>
        <CardDescription>
          Meals and macro total · Confirm to place order
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {data.meals.map((m, i) => (
            <li key={i} className="flex justify-between text-[14px]">
              <span className="text-[#171717]">
                {m.name}
                {m.servings > 1 ? ` × ${m.servings}` : ""}
              </span>
              <span className="text-[#737373]">
                {m.calories} cal · {m.protein}g P
              </span>
            </li>
          ))}
        </ul>
        <p className="border-t border-[#f0f0f0] pt-2 text-[14px] font-medium text-[#171717]">
          Total: {data.totals.calories} cal · {data.totals.protein}g protein
        </p>
        <Button onClick={handleConfirm} disabled={confirming} className="w-full">
          {confirming ? "Placing order…" : "Confirm order"}
        </Button>
      </CardContent>
    </Card>
  );
}
