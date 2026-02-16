"use client";

import Link from "next/link";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type PricingCardVariant = "starter" | "pro";

const STARTER_FEATURES = [
  "Set protein & calories",
  "Generated meal plan",
  "Up to 3 meals/day",
];

const PRO_FEATURES = [
  "Everything in Starter",
  "Unlimited meals",
  "Priority delivery",
  "Nutritionist support (beta)",
];

export function PricingCard({
  variant = "starter",
}: {
  variant?: PricingCardVariant;
}) {
  const isPro = variant === "pro";
  const features = isPro ? PRO_FEATURES : STARTER_FEATURES;

  return (
    <Card
      hover
      accent
      className={isPro ? "relative border-2 border-[#fb923c]" : ""}
    >
      {isPro && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#fb923c] px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Popular
        </span>
      )}
      <CardHeader>
        <CardTitle>{isPro ? "Pro" : "Starter"}</CardTitle>
        <CardDescription>
          {isPro
            ? "Full access during beta. No charge yet."
            : "Set macros, get meals. Limited to 3 meals/day."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-[36px] font-bold text-[#171717] font-display">
          $0 <span className="text-base font-normal text-[#737373]">/ day</span>
        </p>
        <p className="text-[14px] text-[#737373]">
          {isPro ? "Free during beta. We&apos;ll notify before any pricing." : "We&apos;re not charging yet."}
        </p>
        <ul className="space-y-3 border-t border-[#f5f5f5] pt-4">
          {features.map((text) => (
            <li key={text} className="flex items-center gap-2 text-[14px] text-[#737373]">
              <span className="text-[#fb923c]">✓</span> {text}
            </li>
          ))}
        </ul>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="w-full"
              variant={isPro ? "default" : "outline"}
            >
              Get started
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href="/app">
            <Button
              size="lg"
              className="w-full"
              variant={isPro ? "default" : "outline"}
            >
              Go to Dashboard
            </Button>
          </Link>
        </SignedIn>
      </CardContent>
    </Card>
  );
}
