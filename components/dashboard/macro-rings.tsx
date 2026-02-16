"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const macros = [
  { key: "calories", label: "Calories", primary: true },
  { key: "protein", label: "Protein", primary: false },
  { key: "carbs", label: "Carbs", primary: false },
  { key: "fat", label: "Fat", primary: false },
] as const;

const barColors: Record<string, string> = {
  calories: "bg-[#fb923c]",
  protein: "bg-[#6c47ff]",
  carbs: "bg-[#0ea5e9]",
  fat: "bg-[#8b5cf6]",
};

export function MacroRings({
  plan,
  order,
}: {
  plan: { calories: number; protein: number } | null;
  order: { totalCalories: number; totalProtein: number; totalCarbs: number | null; totalFat: number | null } | null;
}) {
  const targets = {
    calories: plan?.calories ?? 2000,
    protein: plan?.protein ?? 120,
    carbs: 200,
    fat: 70,
  };
  const values = {
    calories: order?.totalCalories ?? 0,
    protein: order?.totalProtein ?? 0,
    carbs: order?.totalCarbs ?? 0,
    fat: order?.totalFat ?? 0,
  };
  const percents = macros.map((m) => {
    const v = values[m.key];
    const t = targets[m.key];
    return t > 0 ? Math.min(100, Math.round((v / t) * 100)) : 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {macros.map((m, i) => (
        <div
          key={m.key}
          className={cn(
            "rounded-[16px] border border-[#e5e5e5] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
            m.primary && "border-b-2 border-b-[#fb923c] bg-gradient-to-b from-white to-[#fffbf5]"
          )}
        >
          <p className="text-[28px] font-bold text-[#171717] font-display tabular-nums">
            {percents[i]}%
          </p>
          <p className="text-[13px] font-medium text-[#a3a3a3] mt-0.5">{m.label}</p>
          <div className="mt-3 h-2 w-full rounded-full bg-[#f0f0f0] overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-500 ease-out animate-bar-fill",
                barColors[m.key]
              )}
              style={{ width: mounted ? `${percents[i]}%` : "0%" }}
            />
          </div>
          <p className="text-[11px] text-[#a3a3a3] mt-1 tabular-nums">
            {values[m.key]}
            {m.key !== "calories" ? "g" : ""} / {targets[m.key]}
            {m.key !== "calories" ? "g" : " cal"}
          </p>
        </div>
      ))}
    </div>
  );
}
