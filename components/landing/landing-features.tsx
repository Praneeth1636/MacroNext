"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Set your macros",
    description: "Choose protein, calories, and meal count for tomorrow. One form, done.",
    icon: "📋",
  },
  {
    title: "Get your plan",
    description: "We match meals from our catalog to hit your targets. Preview before you confirm.",
    icon: "📄",
  },
  {
    title: "Confirm & deliver",
    description: "Place your order. We prep and deliver in your chosen window.",
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
      className="mt-12 grid w-full gap-5 md:grid-cols-3"
    >
      {features.map((f, i) => (
        <div
          key={f.title}
          className="transition-all duration-300 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: visible ? `${i * 50}ms` : "0ms",
          }}
        >
          <Card hover>
            <CardHeader>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff7ed] text-[#f97316] text-lg">
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
