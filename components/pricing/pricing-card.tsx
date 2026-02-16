"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CHECK_ITEMS = [
  "Set protein & calories for tomorrow",
  "Generated meal plan",
  "Confirm & place order",
  "Delivery window choice",
];

export function PricingCard() {
  return (
    <Card hover accent>
      <CardHeader>
        <CardTitle>Daily plan</CardTitle>
        <CardDescription>Set macros, get meals, we deliver.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-[36px] font-bold text-[#171717] font-display">
          $0 <span className="text-base font-normal text-[#737373]">/ day</span>
        </p>
        <p className="text-[14px] text-[#737373]">
          We&apos;re not charging yet. Sign up and try the full flow.
        </p>
        <ul className="space-y-3 border-t border-[#f5f5f5] pt-4">
          {CHECK_ITEMS.map((text) => (
            <li key={text} className="flex items-center gap-2 text-[14px] text-[#737373]">
              <span className="text-[#6c47ff]">✓</span> {text}
            </li>
          ))}
        </ul>
        <SignUpButton mode="modal">
          <Button size="lg" className="w-full">
            Get started
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  );
}
