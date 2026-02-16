"use client";

import { useCallback, useEffect, useRef } from "react";

const MAX_PULL = 3;

export function AuthMagneticButton({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const btn = container.querySelector<HTMLButtonElement>(
        "button[type='submit'], [data-clerk-primary-button], .clerk-button--primary, a.clerk-button--primary"
      );
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        const t = 1 - dist / 120;
        const tx = (dx / dist) * MAX_PULL * t;
        const ty = (dy / dist) * MAX_PULL * t;
        btn.style.transform = `translate(${tx}px, ${ty}px)`;
        btn.style.transition = "transform 0.1s ease-out";
      } else {
        btn.style.transform = "";
        btn.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      }
    },
    []
  );

  const onPointerLeave = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLButtonElement>(
      "button[type='submit'], [data-clerk-primary-button], .clerk-button--primary, a.clerk-button--primary"
    );
    if (btn) {
      btn.style.transform = "";
      btn.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new MutationObserver(() => {
      const btn = container.querySelector<HTMLButtonElement>(
        "button[type='submit'], [data-clerk-primary-button]"
      );
      if (btn) {
        btn.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      }
    });
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="w-full max-w-[420px] mx-auto"
    >
      {children}
    </div>
  );
}
