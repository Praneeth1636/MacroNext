"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
          <Link href="/app/plan">
            <Button variant="secondary">Go to Plan</Button>
          </Link>
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
              className="flex items-center justify-between py-3 first:pt-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-[#171717]">
                  {m.name}
                  {m.servings && m.servings > 1 ? ` × ${m.servings}` : ""}
                </p>
              </div>
              {m.calories != null && (
                <span className="text-[13px] text-[#737373] ml-3">{m.calories} cal</span>
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
