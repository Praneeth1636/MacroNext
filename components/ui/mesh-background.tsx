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
        "min-h-screen flex flex-col bg-[#fafafa]",
        dotGrid && "dot-grid",
        className
      )}
    >
      {children}
    </div>
  );
}
