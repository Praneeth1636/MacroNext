import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { MeshBackground } from "@/components/ui/mesh-background";
import { LandingFeatures } from "@/components/landing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <MeshBackground dotGrid>
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-8">
        <section className="flex flex-col items-center text-center animate-page-enter">
          <h1
            className="font-display font-bold text-[#171717] leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Tomorrow&apos;s meals.
            <br />
            Today.
          </h1>
          <p className="mt-4 max-w-xl text-[14px] text-[#737373]">
            Set your protein & calories. We generate your plan. Confirm and we deliver.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="mt-6">
              Start for free
            </Button>
          </SignUpButton>
        </section>

        <LandingFeatures />

        <section className="mt-10 w-full max-w-md mx-auto">
          <Card hover accent>
            <CardHeader>
              <CardTitle>Simple pricing</CardTitle>
              <CardDescription>One plan. No surprises.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[32px] font-bold text-[#171717] font-display">
                $0 <span className="text-base font-normal text-[#737373]">/ day</span>
              </p>
              <p className="text-[14px] text-[#737373]">
                We&apos;re not charging yet. Sign up and try the full flow.
              </p>
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full">
                  Get started
                </Button>
              </SignUpButton>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-12 border-t border-[#e5e5e5] pt-8 pb-8 text-center text-[13px] text-[#a3a3a3]">
          MacroNext · Production-ready MVP
        </footer>
      </div>
    </MeshBackground>
  );
}
