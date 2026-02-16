"use client";

import { cn } from "@/lib/utils";

export function AuthButton({
  className,
  loading,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      type="submit"
      className={cn(
        "flex h-[46px] w-full items-center justify-center rounded-xl bg-[#0f172a] text-[15px] font-medium text-white transition-colors duration-150 hover:bg-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}

export function AuthButtonOutline({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-[rgba(0,0,0,0.15)] bg-white text-[15px] font-medium text-[#0f172a] transition-colors duration-150 hover:border-[rgba(0,0,0,0.25)] hover:bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/25 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
