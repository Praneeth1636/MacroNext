"use client";

import { cn } from "@/lib/utils";

export function AuthLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-sm font-medium text-[#64748b]", className)}
      {...props}
    />
  );
}
