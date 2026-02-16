"use client";

import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-display font-semibold text-[14px] rounded-[10px]",
        "focus:outline-none focus:ring-[3px] focus:ring-[rgba(251,146,60,0.25)] focus:ring-offset-2 focus:ring-offset-white",
        "disabled:pointer-events-none disabled:opacity-50",
        "transition-all duration-200 ease-in-out",
        size === "default" && "px-5 py-2.5",
        size === "sm" && "px-4 py-2",
        size === "lg" && "px-6 py-3",
        variant === "default" && [
          "bg-[#fb923c] text-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "hover:bg-[#f97316] hover:shadow-[0_4px_14px_rgba(251,146,60,0.25),0_1px_3px_rgba(0,0,0,0.06)] hover:-translate-y-px",
          "active:translate-y-0 active:scale-[0.995]",
        ],
        variant === "secondary" && [
          "bg-white border border-[#e5e5e5] text-[#171717]",
          "hover:border-[#d4d4d4] hover:bg-[#fafafa]",
          "active:scale-[0.995]",
        ],
        variant === "outline" && [
          "bg-transparent border-2 border-[#fb923c] text-[#ea580c]",
          "hover:bg-[#fff7ed] hover:border-[#f97316]",
          "active:scale-[0.995]",
        ],
        variant === "ghost" && [
          "bg-transparent text-[#737373]",
          "hover:bg-[#f5f5f5] hover:text-[#171717]",
          "active:scale-[0.995]",
        ],
        className
      )}
      {...props}
    />
  );
}
