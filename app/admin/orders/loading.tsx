import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOrdersLoading() {
  return (
    <div className="space-y-8 animate-page-enter">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-[100px] rounded-[16px]" />
        ))}
      </div>
      <Skeleton className="h-[400px] rounded-[16px]" />
    </div>
  );
}
