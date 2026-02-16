"use client";

const stats = [
  { key: "totalUsers", label: "Total Users", points: "0,15 10,12 20,14 30,8 40,10 50,5 60,3" },
  { key: "activeToday", label: "Active Today", points: "0,10 10,14 20,8 30,12 40,6 50,10 60,4" },
  { key: "proSubscribers", label: "Pro Subscribers", points: "0,12 10,10 20,14 30,11 40,8 50,12 60,9" },
  { key: "revenue", label: "Revenue", points: "0,14 10,8 20,12 30,6 40,10 50,4 60,2" },
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-stagger-up">
      {stats.map((s) => (
        <div
          key={s.key}
          className="relative overflow-hidden rounded-[16px] border border-[#e5e5e5] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] cursor-default"
        >
          <svg
            className="absolute top-4 right-4 h-5 w-[60px] opacity-30"
            viewBox="0 0 60 20"
            aria-hidden
          >
            <polyline
              points={s.points}
              fill="none"
              stroke="#fb923c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[13px] font-medium text-[#a3a3a3]">{s.label}</p>
          <p className="mt-1 text-[28px] font-bold text-[#171717] font-display tabular-nums">
            {s.key === "revenue" ? `$${values[s.key]}` : values[s.key]}
          </p>
          <p className="mt-1.5 inline-flex items-center gap-0.5 rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-[12px] font-medium text-[#16a34a]">
            <span>↑</span> {changes[s.key]} this week
          </p>
        </div>
      ))}
    </div>
  );
}
