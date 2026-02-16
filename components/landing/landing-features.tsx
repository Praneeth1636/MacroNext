"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    step: "01",
    title: "Set your macros",
    description: "Choose protein, calories, and meal count for tomorrow. One form, done. We remember your preferences so you can tweak in seconds.",
    icon: "📋",
  },
  {
    step: "02",
    title: "Get your plan",
    description: "We match meals from our catalog to hit your targets. Preview every dish and macro breakdown before you confirm.",
    icon: "📄",
  },
  {
    step: "03",
    title: "Confirm & deliver",
    description: "Place your order in one tap. We prep fresh and deliver in your chosen window. No subscriptions, no lock-in.",
    icon: "🚚",
  },
];

export function LandingFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-24 grid w-full gap-5 md:grid-cols-3"
    >
      {features.map((f, i) => (
        <div
          key={f.title}
          className="transition-all duration-300 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: visible ? `${i * 80}ms` : "0ms",
          }}
        >
          <Card hover className="min-h-[180px]">
            <CardHeader>
              <p className="text-[11px] font-semibold text-[#a3a3a3] tracking-[0.08em] uppercase mb-1.5">
                STEP {f.step}
              </p>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff7ed] text-[#f97316] text-xl shadow-[0_1px_3px_rgba(249,115,22,0.08)]">
                {f.icon}
              </div>
              <CardTitle className="text-[16px]">{f.title}</CardTitle>
              <CardDescription className="text-left text-[14px]">{f.description}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ))}
    </section>
  );
}
