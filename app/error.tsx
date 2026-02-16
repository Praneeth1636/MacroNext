"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-md rounded-[16px] border border-[#e5e5e5] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h1 className="text-[20px] font-semibold text-[#171717] font-display">
          Something went wrong
        </h1>
        <pre className="mt-4 overflow-auto rounded-xl bg-[#fef2f2] p-4 text-[13px] font-mono text-[#dc2626]">
          {error.message}
        </pre>
        <Button onClick={reset} className="mt-6">
          Try again
        </Button>
      </div>
    </div>
  );
}
