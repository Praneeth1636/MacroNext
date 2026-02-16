import { MeshBackground } from "@/components/ui/mesh-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MeshBackground dotGrid>
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        {children}
      </div>
    </MeshBackground>
  );
}
