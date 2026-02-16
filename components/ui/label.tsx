"use client";

import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-[13px] font-medium text-[#737373] mb-1.5 select-none", className)}
      {...props}
    />
  );
}
