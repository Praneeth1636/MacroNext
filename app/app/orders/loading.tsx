import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <div className="space-y-8 animate-page-enter">
      <Skeleton className="h-8 w-32 rounded-[10px]" />
      <Skeleton className="h-[300px] rounded-[16px]" />
    </div>
  );
}
