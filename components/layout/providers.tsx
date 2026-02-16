"use client";

/**
 * Pass-through. ClerkProvider is in app/layout.tsx.
 * Kept for any code that imports Providers.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
