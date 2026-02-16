"use client";

import { MeshBackground } from "@/components/ui/mesh-background";

export function AppPageBackground({ children }: { children: React.ReactNode }) {
  return <MeshBackground dotGrid>{children}</MeshBackground>;
}
