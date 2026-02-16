"use client";

import { useRouter } from "next/navigation";
import { adminUpdateOrderStatus } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OrderStatus } from "@prisma/client";

const statuses: OrderStatus[] = ["PLACED", "PREPPING", "OUT_FOR_DELIVERY", "DELIVERED"];

const statusPill: Record<string, { bg: string; text: string; dot: string }> = {
  PLACED: { bg: "bg-[#fff7ed]", text: "text-[#ea580c]", dot: "bg-[#ea580c]" },
  PREPPING: { bg: "bg-[#fffbeb]", text: "text-[#d97706]", dot: "bg-[#d97706]" },
  OUT_FOR_DELIVERY: { bg: "bg-[#eff6ff]", text: "text-[#2563eb]", dot: "bg-[#2563eb]" },
  DELIVERED: { bg: "bg-[#f0fdf4]", text: "text-[#16a34a]", dot: "bg-[#16a34a]" },
};

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

function DownloadIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

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
        <div className="flex flex-wrap items-end justify-between gap-4">
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
            <Button variant="secondary" onClick={exportCSV} className="inline-flex items-center gap-2">
              <DownloadIcon />
              Export CSV
            </Button>
          </div>
          <p className="text-[13px] font-medium text-[#a3a3a3]">
            Orders ({rows.length})
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#f8f8f8] text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-[0.06em]">
                <th className="p-3">Name</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Address</th>
                <th className="p-3">Macros</th>
                <th className="p-3">Meals</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const pill = statusPill[r.status] ?? statusPill.PLACED;
                return (
                  <tr
                    key={r.id}
                    className={`border-b border-[#f0f0f0] transition-colors duration-150 hover:bg-[#f5f5f5] ${i % 2 === 1 ? "bg-[#fafafa]" : ""}`}
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
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${pill.bg} ${pill.text}`}
                        >
                          {r.status.replace(/_/g, " ")}
                        </span>
                        <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${pill.dot}`} />
                        <select
                          value={r.status}
                          onChange={(e) =>
                            handleStatusChange(r.id, e.target.value as OrderStatus)
                          }
                          className="rounded-[10px] border border-[#e5e5e5] bg-white px-3 py-1.5 text-[14px] text-[#171717] focus:outline-none focus:border-[#fb923c] focus:ring-[2px] focus:ring-[rgba(251,146,60,0.12)]"
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
                );
              })}
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
