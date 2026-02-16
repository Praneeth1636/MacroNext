import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-8 animate-page-enter">
      <Skeleton className="h-8 w-24 rounded-[10px]" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded-[10px]" />
          <Skeleton className="h-3 w-48 rounded-[10px]" />
        </div>
      </div>
      <Skeleton className="h-[400px] rounded-[16px]" />
    </div>
  );
}
