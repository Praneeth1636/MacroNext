"use client";

import { useRouter } from "next/navigation";
import { adminUpdateOrderStatus } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OrderStatus } from "@prisma/client";

const statuses: OrderStatus[] = ["PLACED", "PREPPING", "OUT_FOR_DELIVERY", "DELIVERED"];

type Row = {
  id: string;
  userName: string;
  email: string | null;
  address: string;
  calories: number;
  protein: number;
  mealsSummary: string;
  status: string;
};

export function AdminOrdersClient({
  dateStr,
  rows,
}: {
  dateStr: string;
  rows: Row[];
}) {
  const router = useRouter();

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    router.push(`/admin/orders?date=${v}`);
  }

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    await adminUpdateOrderStatus(orderId, status);
    router.refresh();
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Address", "Calories", "Protein", "Meals", "Status"];
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        [
          `"${r.userName.replace(/"/g, '""')}"`,
          `"${(r.email ?? "").replace(/"/g, '""')}"`,
          `"${r.address.replace(/"/g, '""')}"`,
          r.calories,
          r.protein,
          `"${r.mealsSummary.replace(/"/g, '""')}"`,
          r.status,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${dateStr}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card accent>
      <CardContent className="space-y-4 pt-6">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={dateStr}
              onChange={handleDateChange}
              className="mt-1.5 w-auto"
            />
          </div>
          <Button variant="secondary" onClick={exportCSV}>
            Export CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa] text-[#737373]">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Plan</th>
                <th className="p-3 font-medium">Address</th>
                <th className="p-3 font-medium">Macros</th>
                <th className="p-3 font-medium">Meals</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.id}
                  className="border-b border-[#f0f0f0] hover:bg-[#f5f5f5] transition-colors duration-150"
                >
                  <td className="p-3 text-[#171717] font-medium">{r.userName}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${
                        i % 3 === 0 ? "bg-[#f5f3ff] text-[#6c47ff]" : "bg-[#f5f5f5] text-[#737373]"
                      }`}
                    >
                      {i % 3 === 0 ? "Pro" : i % 3 === 1 ? "Team" : "Free"}
                    </span>
                  </td>
                  <td className="max-w-[200px] truncate p-3 text-[#737373]">{r.address}</td>
                  <td className="p-3 text-[#737373]">
                    {r.calories} cal · {r.protein}g P
                  </td>
                  <td className="max-w-[200px] truncate p-3 text-[#737373]">{r.mealsSummary}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
                          r.status === "DELIVERED" ? "bg-[#a3a3a3]" : "bg-[#16a34a]"
                        }`}
                      />
                      <select
                        value={r.status}
                        onChange={(e) =>
                          handleStatusChange(r.id, e.target.value as OrderStatus)
                        }
                        className="rounded-[10px] border border-[#e5e5e5] bg-white px-3 py-1.5 text-[14px] text-[#171717] focus:outline-none focus:border-[#6c47ff] focus:ring-[2px] focus:ring-[rgba(108,71,255,0.1)]"
                      >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                      </select>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <p className="py-4 text-center text-[14px] text-[#737373]">No orders for this date.</p>
        )}
      </CardContent>
    </Card>
  );
}
