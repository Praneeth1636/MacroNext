"use client";

import { cn } from "@/lib/utils";

type MeshBackgroundProps = {
  className?: string;
  children: React.ReactNode;
  dotGrid?: boolean;
};

export function MeshBackground({
  className,
  children,
  dotGrid = false,
}: MeshBackgroundProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-[#fafafa relative",
        dotGrid && "dot-grid",
        className
      )}
    >
      {/* Subtle warm gradient wash at top */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,146,60,0.03),transparent)]"
        aria-hidden
      />
      {/* Faint warmth at bottom-right for asymmetry */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,rgba(251,146,60,0.02),transparent)]"
        aria-hidden
      />
      {children}
    </div>
  );
}
