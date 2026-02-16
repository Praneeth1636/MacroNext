"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const AUTH_PATHS = ["/login", "/register", "/forgot-password", "/verify-email", "/logout"];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname && AUTH_PATHS.some((p) => pathname.startsWith(p))) return null;

  const isApp = pathname?.startsWith("/app");
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-14 border-b border-[#e5e5e5] bg-white px-6 flex items-center",
        "transition-shadow duration-150",
        scrolled && "shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      )}
    >
      <div className="mx-auto flex max-w-5xl w-full items-center justify-between">
        <Link
          href={isApp ? "/app" : isAdmin ? "/admin/orders" : "/"}
          className="font-display text-[20px] font-extrabold text-[#171717] tracking-tight"
        >
          MacroNext
        </Link>
        <SignedOut>
          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-[14px] font-medium text-[#737373] hover:text-[#171717] transition-colors duration-150 px-2 py-1.5 rounded-md"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-[14px] font-medium text-[#737373] hover:text-[#171717] transition-colors duration-150 px-2 py-1.5 rounded-md"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center font-semibold text-[14px] rounded-[10px] px-5 py-2.5 bg-[#fb923c] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#f97316] hover:shadow-[0_4px_12px_rgba(249,115,22,0.2)] hover:-translate-y-px active:scale-[0.995] transition-all duration-150"
            >
              Get started
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {isApp && (
                <>
                  <NavLink href="/app" label="Dashboard" active={pathname === "/app"} />
                  <NavLink href="/app/profile" label="Profile" active={pathname === "/app/profile"} />
                  <NavLink href="/app/plan" label="Plan" active={pathname === "/app/plan"} />
                  <NavLink href="/app/orders" label="Orders" active={pathname?.startsWith("/app/orders")} />
                  <Link
                    href="/admin/orders"
                    className="text-[14px] font-medium text-[#737373] hover:text-[#171717] transition-colors duration-150 px-3 py-2 rounded-md"
                  >
                    Admin
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link
                  href="/app"
                  className="text-[14px] font-medium text-[#737373] hover:text-[#171717] transition-colors duration-150 px-3 py-2 rounded-md"
                >
                  App
                </Link>
              )}
              {!isApp && !isAdmin && (
                <Link
                  href="/app"
                  className="text-[14px] font-medium text-[#737373] hover:text-[#171717] transition-colors duration-150 px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
              )}
            </nav>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: { avatarBox: "w-8 h-8 ring-1 ring-[#e5e5e5]" },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[14px] font-medium transition-colors duration-150 px-3 py-2 rounded-md border-b-2 -mb-px",
        active
          ? "text-[#171717] border-[#6c47ff]"
          : "text-[#737373] border-transparent hover:text-[#171717]"
      )}
    >
      {label}
    </Link>
  );
}
