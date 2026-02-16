import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminOrdersClient } from "./admin-orders-client";
import { AdminStatCards } from "./admin-stat-cards";

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const authUser = await getAuth();
  if (authUser?.role !== "ADMIN") redirect("/app");

  const { date: dateParam } = await searchParams;
  const tomorrow = getTomorrow();
  const dateStr = dateParam ?? tomorrow.toISOString().slice(0, 10);
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  const orders = await prisma.order.findMany({
    where: { date },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  const profiles = await prisma.profile.findMany({
    where: { userId: { in: orders.map((o) => o.userId) } },
  });
  const profileByUser = Object.fromEntries(profiles.map((p) => [p.userId, p]));

  const rows = orders.map((o) => {
    const profile = profileByUser[o.userId];
    const address = profile
      ? `${profile.addressLine1}, ${profile.city}, ${profile.state} ${profile.zip}`
      : "—";
    const meals = Array.isArray(o.generatedMeals)
      ? (o.generatedMeals as { name: string; servings?: number }[]).map(
          (m) => `${m.name}${m.servings && m.servings > 1 ? ` ×${m.servings}` : ""}`
        )
      : [];
    return {
      id: o.id,
      userName: o.user.name ?? o.user.email ?? "—",
      email: o.user.email,
      address,
      calories: o.totalCalories,
      protein: o.totalProtein,
      mealsSummary: meals.join("; "),
      status: o.status,
    };
  });

  const userCount = await prisma.user.count();
  const activeToday = orders.length;
  const proCount = 0;
  const revenue = 0;

  return (
    <div className="space-y-8 animate-page-enter">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display">
        <span className="text-[#6c47ff]">Admin</span> · Tomorrow&apos;s orders
      </h1>
      <AdminStatCards
        totalUsers={userCount}
        activeToday={activeToday}
        proSubscribers={proCount}
        revenue={revenue}
      />
      <AdminOrdersClient dateStr={dateStr} rows={rows} />
    </div>
  );
}
