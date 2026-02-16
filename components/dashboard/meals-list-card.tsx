"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function EmptyPlateIcon() {
  return (
    <svg
      className="mx-auto mb-4 h-12 w-12 text-[#d4d4d4]"
      fill="none"
      viewBox="0 0 48 48"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <ellipse cx="24" cy="26" rx="14" ry="6" />
      <path d="M10 26v2a2 2 0 002 2h24a2 2 0 002-2v-2" />
      <path d="M18 14l2 4M24 12v4M30 14l-2 4" strokeLinecap="round" />
    </svg>
  );
}

export function MealsListCard({
  meals,
  orderDate,
}: {
  meals: { name: string; servings?: number; calories?: number }[];
  orderDate?: Date;
}) {
  if (meals.length === 0) {
    return (
      <Card hover accent>
        <CardHeader>
          <CardTitle>Meals</CardTitle>
          <CardDescription>No meals yet. Create a plan and confirm your order.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-[#e5e5e5] rounded-xl p-8 text-center">
            <EmptyPlateIcon />
            <p className="text-[14px] text-[#737373] mb-4">
              No meals for this day yet. Set your macros and confirm your order to see your plan here.
            </p>
            <Link href="/app/plan" className="block">
              <Button size="lg" className="w-full">
                Go to Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card hover accent>
      <CardHeader>
        <CardTitle>Tomorrow&apos;s meals</CardTitle>
        <CardDescription>
          {orderDate ? orderDate.toISOString().slice(0, 10) : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-[#f0f0f0]">
          {meals.map((m, i) => (
            <li
              key={i}
              className="flex items-center gap-3 py-3 first:pt-0"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-[12px] font-semibold text-[#a3a3a3]">
                #{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-[#171717]">
                  {m.name}
                  {m.servings && m.servings > 1 ? ` × ${m.servings}` : ""}
                </p>
              </div>
              {m.calories != null && (
                <span className="rounded-full bg-[#fff7ed] px-2 py-0.5 text-[12px] font-medium text-[#ea580c]">
                  {m.calories} cal
                </span>
              )}
            </li>
          ))}
        </ul>
        <Link href="/app/orders" className="mt-4 block">
          <Button variant="ghost">View all orders</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
