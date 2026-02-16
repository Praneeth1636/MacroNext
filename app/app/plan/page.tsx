import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { PlanForm } from "./plan-form";
import { PlanPreview } from "./plan-preview";

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authUser = await getAuth();
  if (!authUser?.userId) redirect("/login");

  const tomorrow = getTomorrow();
  const plan = await prisma.macroPlan.findUnique({
    where: { userId_date: { userId: authUser.userId, date: tomorrow } },
  });
  const existingOrder = await prisma.order.findFirst({
    where: { userId: authUser.userId, date: tomorrow },
  });
  const { error } = await searchParams;

  return (
    <div className="space-y-8 animate-page-enter">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display">Set tomorrow&apos;s plan</h1>
      {error === "invalid" && (
        <p className="rounded-[10px] border border-[#dc2626]/30 bg-[#fef2f2] px-4 py-2 text-[14px] text-[#dc2626]">
          Please check your input. Protein 50–300g, calories 1000–4000, meals 2–5.
        </p>
      )}
      <PlanForm plan={plan} tomorrowStr={tomorrow.toISOString().slice(0, 10)} />
      {plan && !existingOrder && (
        <PlanPreview />
      )}
      {plan && existingOrder && (
        <div className="rounded-[16px] border border-[#e9e5ff] bg-[#f5f3ff] p-4 text-center text-[14px] text-[#6c47ff]">
          Order for tomorrow already placed. View it in{" "}
          <a href="/app/orders" className="underline font-medium">Orders</a>.
        </div>
      )}
    </div>
  );
}
