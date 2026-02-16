"use client";

import { cn } from "@/lib/utils";

const CARD_CLASS =
  "w-full max-w-[420px] min-w-0 rounded-[18px] border border-[rgba(0,0,0,0.08)] bg-white p-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_2px_4px_-2px_rgba(0,0,0,0.05)] transition-all duration-200 sm:p-8";

export function AuthCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(CARD_CLASS, "opacity-100 duration-300", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function AuthCardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-6 text-center", className)} {...props}>
      {children}
    </div>
  );
}

export function AuthLogo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-4 text-xl font-bold tracking-tight text-[#0f172a]", className)}
      {...props}
    />
  );
}

export function AuthTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-[22px] font-semibold text-[#0f172a] tracking-tight", className)}
      {...props}
    />
  );
}

export function AuthSubtitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1.5 text-sm text-[#64748b]", className)} {...props} />
  );
}

export function AuthSocialSection({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function AuthDivider({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative my-6 flex items-center gap-3", className)}
      {...props}
    >
      <span className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
      <span className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">or</span>
      <span className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
    </div>
  );
}

export function AuthForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  return <form className={cn("space-y-4", className)} {...props} />;
}

export function AuthFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <p
      className={cn("mt-6 text-center text-xs text-[#94a3b8]", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function AuthFooterLinks({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "text-[#6366f1] hover:underline focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:ring-offset-2 rounded",
        className
      )}
      {...props}
    />
  );
}
