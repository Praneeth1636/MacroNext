"use client";

const stats = [
  { key: "totalUsers", label: "Total Users" },
  { key: "activeToday", label: "Active Today" },
  { key: "proSubscribers", label: "Pro Subscribers" },
  { key: "revenue", label: "Revenue" },
] as const;

const changes: Record<string, string> = {
  totalUsers: "+12%",
  activeToday: "+5",
  proSubscribers: "+2",
  revenue: "+$240",
};

export function AdminStatCards({
  totalUsers,
  activeToday,
  proSubscribers,
  revenue,
}: {
  totalUsers: number;
  activeToday: number;
  proSubscribers: number;
  revenue: number;
}) {
  const values = { totalUsers, activeToday, proSubscribers, revenue };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.key}
          className="rounded-[16px] border border-[#e5e5e5] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <p className="text-[13px] font-medium text-[#a3a3a3]">{s.label}</p>
          <p className="mt-1 text-[28px] font-bold text-[#171717] font-display tabular-nums">
            {s.key === "revenue" ? `$${values[s.key]}` : values[s.key]}
          </p>
          <p className="mt-1.5 inline-flex items-center rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-[12px] font-medium text-[#16a34a]">
            {changes[s.key]} this week
          </p>
        </div>
      ))}
    </div>
  );
}
