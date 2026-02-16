import Link from "next/link";
import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const statusLabels: Record<string, string> = {
  PLACED: "Placed",
  PREPPING: "Prepping",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
};

export default async function OrdersPage() {
  const authUser = await getAuth();
  if (!authUser?.userId) return null;

  const orders = await prisma.order.findMany({
    where: { userId: authUser.userId },
    orderBy: { date: "desc" },
    take: 20,
  });

  return (
    <div className="space-y-6 animate-page-enter">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display">Orders</h1>
      {orders.length === 0 ? (
        <Card accent>
          <CardContent className="py-8 text-center text-[14px] text-[#737373]">
            No orders yet. Create a plan and confirm from the Plan page.
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id}>
              <Link href={`/app/orders/${o.id}`}>
                <Card hover accent className="cursor-pointer">
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium text-[#171717]">
                        {o.date.toISOString().slice(0, 10)}
                      </p>
                      <p className="text-[14px] text-[#737373]">
                        {o.totalCalories} cal · {o.totalProtein}g protein ·{" "}
                        {statusLabels[o.status] ?? o.status}
                      </p>
                    </div>
                    <Button variant="ghost">View</Button>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
