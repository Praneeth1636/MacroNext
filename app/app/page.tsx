import Link from "next/link";
import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MacroRings, MealsListCard, QuickAddSection } from "@/components/dashboard";

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

const statusLabels: Record<string, string> = {
  PLACED: "Placed",
  PREPPING: "Prepping",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
};

function DbUnavailableCard() {
  return (
    <div className="space-y-8 animate-page-enter">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display">Dashboard</h1>
      <Card accent>
        <CardHeader>
          <CardTitle className="text-[#171717]">Database not connected</CardTitle>
          <CardDescription className="space-y-2 text-[14px]">
            <span className="block">Connect a database to use the app. Choose one:</span>
            <span className="block">
              <strong className="text-[#171717]">Neon (no Docker):</strong> Create a project at{" "}
              <a href="https://neon.tech" target="_blank" rel="noreferrer" className="text-[#6c47ff] underline">neon.tech</a>
              , copy the connection string, set <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[13px]">DATABASE_URL</code> in{" "}
              <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[13px]">.env</code> and <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[13px]">.env.local</code>, then run <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[13px]">npm run db:push</code>.
            </span>
            <span className="block">
              <strong className="text-[#171717]">Docker:</strong> Run <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[13px]">npm run db:docker</code>, then <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[13px]">npm run db:push</code>.
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default async function DashboardPage() {
  try {
    const authUser = await getAuth();
    if (!authUser?.userId) return null;

    const tomorrow = getTomorrow();
    let plan: Awaited<ReturnType<typeof prisma.macroPlan.findUnique>> = null;
    let order: Awaited<ReturnType<typeof prisma.order.findFirst>> = null;

    try {
      [plan, order] = await Promise.all([
        prisma.macroPlan.findUnique({
          where: { userId_date: { userId: authUser.userId, date: tomorrow } },
        }),
        prisma.order.findFirst({
          where: { userId: authUser.userId, date: tomorrow },
          orderBy: { createdAt: "desc" },
        }),
      ]);
    } catch {
      return <DbUnavailableCard />;
    }

    const meals =
      order && typeof order.generatedMeals === "object" && Array.isArray(order.generatedMeals)
        ? (order.generatedMeals as { name: string; servings?: number; calories?: number }[])
        : [];

    return (
      <div className="space-y-8 animate-page-enter">
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display">Dashboard</h1>

        <MacroRings plan={plan} order={order} />

        <div className="grid gap-6 md:grid-cols-2">
          <Card hover accent>
            <CardHeader>
              <CardTitle>Tomorrow&apos;s macros</CardTitle>
              <CardDescription>
                {plan
                  ? `Target: ${plan.calories} cal · ${plan.protein}g protein · ${plan.mealsCount} meals`
                  : "Set your protein, calories, and meal count for tomorrow."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {plan ? (
                <div className="flex items-center justify-between">
                  <p className="text-[14px] text-[#737373]">
                    {plan.preference.replace("_", " ")} · {plan.notes || "—"}
                  </p>
                  <Link href="/app/plan">
                    <Button variant="secondary">Edit plan</Button>
                  </Link>
                </div>
              ) : (
                <Link href="/app/plan">
                  <Button className="w-full">Set tomorrow&apos;s plan</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card hover accent>
            <CardHeader>
              <CardTitle>Tomorrow&apos;s order</CardTitle>
              <CardDescription>
                {order
                  ? statusLabels[order.status] ?? order.status
                  : "No order placed for tomorrow yet."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {order ? (
                <>
                  <p className="mb-2 text-[14px] text-[#737373]">
                    {order.totalCalories} cal · {order.totalProtein}g protein
                  </p>
                  <Link href="/app/orders">
                    <Button variant="ghost">View all orders</Button>
                  </Link>
                </>
              ) : (
                <Link href="/app/plan">
                  <Button className="w-full">Create plan & place order</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        <MealsListCard meals={meals} orderDate={order?.date} />

        <QuickAddSection />
      </div>
    );
  } catch {
    return <DbUnavailableCard />;
  }
}
