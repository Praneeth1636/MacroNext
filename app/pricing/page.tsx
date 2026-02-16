import { MeshBackground } from "@/components/ui/mesh-background";
import { PricingCard } from "@/components/pricing";

const HIGHLIGHTS = [
  "No credit card required",
  "Cancel anytime",
  "Full access during beta",
];

export default function PricingPage() {
  return (
    <MeshBackground dotGrid>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center animate-page-enter">
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display md:text-3xl">
          Simple pricing
        </h1>
        <p className="mt-4 text-[14px] text-[#737373]">
          One plan today. More options soon. (MVP — not charging yet.)
        </p>
      </div>

      <section className="mx-auto grid w-full max-w-3xl gap-6 px-4 md:grid-cols-2">
        <PricingCard variant="starter" />
        <PricingCard variant="pro" />
      </section>

      <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-8 px-4 text-[13px] text-[#737373]">
        {HIGHLIGHTS.map((text) => (
          <span key={text} className="flex items-center gap-2">
            <span className="text-[#fb923c]">✓</span> {text}
          </span>
        ))}
      </div>
    </MeshBackground>
  );
}
