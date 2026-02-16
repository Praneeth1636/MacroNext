import Link from "next/link";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { MeshBackground } from "@/components/ui/mesh-background";
import { LandingFeatures } from "@/components/landing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <MeshBackground dotGrid>
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-8">
        <section className="flex flex-col items-center text-center animate-page-enter">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fed7aa] bg-[#fff7ed] px-4 py-1.5 text-[13px] font-medium text-[#ea580c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#fb923c] animate-pulse" />
            Now in beta
          </div>
          <h1
            className="font-display font-bold text-[#171717] leading-tight max-w-2xl mx-auto"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 4.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Tomorrow&apos;s meals.
            <br />
            Today.
          </h1>
          <p className="mt-4 text-[15px] md:text-[17px] text-[#737373] max-w-lg">
            Tell us your macros. We&apos;ll handle the rest — from meal planning to doorstep delivery.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg" className="mt-6">
                Start for free
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/app">
              <Button size="lg" className="mt-6">
                Go to Dashboard
              </Button>
            </Link>
          </SignedIn>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: "⚡", text: "Set macros in under 30 seconds" },
              { icon: "🍽️", text: "Meals matched to your exact targets" },
              { icon: "📦", text: "Delivered to your door, on your schedule" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5 text-[13px] text-[#737373]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff7ed] text-[13px]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </section>

        <LandingFeatures />

        <section className="mt-24 w-full max-w-md mx-auto">
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
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="w-full">
                    Get started
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/app">
                  <Button size="lg" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-24 border-t border-[#e5e5e5] pt-10 pb-10 text-center text-[13px] text-[#a3a3a3]">
          © 2025 MacroNext. All rights reserved.
        </footer>
      </div>
    </MeshBackground>
  );
}
