"use client";

import { cn } from "@/lib/utils";

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  showGrain = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showRadialGradient?: boolean;
  showGrain?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[hsl(var(--background))] px-4 py-20",
        className
      )}
      {...props}
    >
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      {/* Aurora orbs */}
      <div
        className="animate-aurora absolute -inset-20 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% -10%, rgba(34, 197, 94, 0.45), transparent 50%),
            radial-gradient(ellipse 55% 40% at 100% 10%, rgba(59, 130, 246, 0.35), transparent 50%),
            radial-gradient(ellipse 50% 35% at 0% 10%, rgba(168, 85, 247, 0.3), transparent 50%)
          `,
          backgroundSize: "200% 200%",
        }}
      />
      {showRadialGradient && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(34,197,94,0.08),transparent)]" />
      )}
      {showGrain && <div className="grain absolute inset-0 z-[1]" />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
