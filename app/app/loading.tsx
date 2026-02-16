import { Skeleton } from "@/components/ui/skeleton";

export default function AppDashboardLoading() {
  return (
    <div className="space-y-8 animate-page-enter">
      <div>
        <Skeleton className="h-8 w-48 rounded-[10px]" />
        <Skeleton className="mt-2 h-4 w-64 rounded-[10px]" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-[100px] rounded-[16px]" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[160px] rounded-[16px]" />
        <Skeleton className="h-[160px] rounded-[16px]" />
      </div>
      <Skeleton className="h-[200px] rounded-[16px]" />
    </div>
  );
}
