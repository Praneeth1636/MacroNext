import Link from "next/link";
import { MeshBackground } from "@/components/ui/mesh-background";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <MeshBackground>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-[80px] font-bold text-[#e5e5e5]">404</p>
        <p className="mt-2 text-[20px] font-semibold text-[#171717]">Page not found</p>
        <p className="mt-2 max-w-sm text-[14px] text-[#737373]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="mt-8">
          <Button size="lg">Go home</Button>
        </Link>
      </div>
    </MeshBackground>
  );
}
