"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    signOut?.({ redirectUrl: "/" }).then(() => router.replace("/"));
  }, [signOut, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
      <div className="text-center text-[#64748b]">
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#6366f1] border-t-transparent" />
        <p className="mt-3 text-sm">Signing you out…</p>
      </div>
    </div>
  );
}
