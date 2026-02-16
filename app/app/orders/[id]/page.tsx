import Link from "next/link";
import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const statusLabels: Record<string, string> = {
  PLACED: "Placed",
  PREPPING: "Prepping",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authUser = await getAuth();
  if (!authUser?.userId) return null;

  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: { id, userId: authUser.userId },
  });
  if (!order) notFound();

  const meals = Array.isArray(order.generatedMeals)
    ? (order.generatedMeals as { name: string; servings?: number; calories: number; protein: number }[])
    : [];

  return (
    <div className="space-y-6 animate-page-enter">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display">
          Order · {order.date.toISOString().slice(0, 10)}
        </h1>
        <Link href="/app/orders">
          <Button variant="ghost">← Orders</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <p className="text-[14px] font-medium text-[#6c47ff]">{statusLabels[order.status] ?? order.status}</p>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-[14px]">
            <span className="text-[#737373]">Calories:</span>{" "}
            <span className="text-[#171717]">{order.totalCalories}</span>
          </p>
          <p className="text-[14px]">
            <span className="text-[#737373]">Protein:</span>{" "}
            <span className="text-[#171717]">{order.totalProtein}g</span>
          </p>
          {order.totalCarbs != null && (
            <p className="text-[14px]">
              <span className="text-[#737373]">Carbs:</span>{" "}
              <span className="text-[#171717]">{order.totalCarbs}g</span>
            </p>
          )}
          {order.totalFat != null && (
            <p className="text-[14px]">
              <span className="text-[#737373]">Fat:</span>{" "}
              <span className="text-[#171717]">{order.totalFat}g</span>
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Meals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {meals.map((m, i) => (
              <li key={i} className="flex justify-between text-[14px]">
                <span className="text-[#171717]">
                  {m.name}
                  {m.servings && m.servings > 1 ? ` × ${m.servings}` : ""}
                </span>
                <span className="text-[#737373]">
                  {m.calories} cal · {m.protein}g P
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
