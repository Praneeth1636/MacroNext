"use client";

import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  hover = false,
  accent,
  accentVariant = "orange",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  accent?: boolean;
  accentVariant?: "orange" | "purple";
}) {
  return (
    <div
      className={cn(
        "relative rounded-[16px] border border-[#e5e5e5] bg-white p-6",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)]",
        "transition-all duration-200 ease-in-out",
        hover && [
          "hover:shadow-[0_8px_24px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.04)]",
          "hover:-translate-y-0.5 hover:border-[#d4d4d4]",
        ],
        accent && [
          "relative overflow-hidden hover:border-[#fed7aa]",
        ],
        className
      )}
      {...props}
    >
      {hover && (
        <div
          className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.04)] to-transparent"
          aria-hidden
        />
      )}
      {accent && (
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-1 rounded-r-[2px]",
            accentVariant === "orange" && "bg-gradient-to-b from-[#fb923c] to-[#f97316]",
            accentVariant === "purple" && "bg-gradient-to-b from-[#6c47ff] to-[#8b5cf6]"
          )}
          aria-hidden
        />
      )}
      <div className={accent ? "pl-5" : ""}>{children}</div>
    </div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-[16px] font-semibold text-[#171717]", className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-[14px] text-[#737373]", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
