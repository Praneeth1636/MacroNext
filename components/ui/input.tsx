"use client";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-[10px] border border-[#e5e5e5] bg-white px-4 py-3 text-[14px] text-[#171717]",
        "placeholder:text-[#a3a3a3]",
        "focus:outline-none focus:border-[#6c47ff] focus:ring-[3px] focus:ring-[rgba(108,71,255,0.1)]",
        "transition-all duration-150 ease-in-out",
        className
      )}
      {...props}
    />
  );
}
