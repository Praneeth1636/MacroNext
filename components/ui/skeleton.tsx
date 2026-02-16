"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-[10px] bg-[#f0f0f0] animate-pulse", className)}
      {...props}
    />
  );
}
