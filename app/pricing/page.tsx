import Link from "next/link";
import { MeshBackground } from "@/components/ui/mesh-background";
import { PricingCard } from "@/components/pricing";

export default function PricingPage() {
  return (
    <MeshBackground dotGrid>
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-20 text-center animate-page-enter">
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display md:text-3xl">
          Simple pricing
        </h1>
        <p className="mt-4 text-[14px] text-[#737373]">
          One plan. No surprises. (MVP — not charging yet.)
        </p>
      </div>

      <section className="mt-14 w-full max-w-md px-4">
        <PricingCard />
      </section>

      <Link
        href="/"
        className="mt-10 text-[14px] text-[#737373] hover:text-[#171717] transition-colors duration-150"
      >
        ← Back to home
      </Link>
    </MeshBackground>
  );
}
