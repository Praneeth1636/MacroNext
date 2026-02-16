import { Skeleton } from "@/components/ui/skeleton";

export default function PlanLoading() {
  return (
    <div className="space-y-8 animate-page-enter">
      <Skeleton className="h-8 w-56 rounded-[10px]" />
      <div className="space-y-5">
        <Skeleton className="h-[120px] rounded-[16px]" />
        <Skeleton className="h-[120px] rounded-[16px]" />
        <Skeleton className="h-10 w-32 rounded-[10px]" />
      </div>
      <Skeleton className="h-[200px] rounded-[16px]" />
    </div>
  );
}
