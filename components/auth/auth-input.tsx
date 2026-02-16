"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const AuthInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: string }
>(function AuthInput({ className, error, ...props }, ref) {
  return (
    <div className="space-y-1">
      <input
        ref={ref}
        className={cn(
          "h-[46px] w-full rounded-xl border bg-white px-4 text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] transition-[border-color,box-shadow] duration-150",
          "border-[rgba(0,0,0,0.12)] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/25",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/25",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
