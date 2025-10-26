import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loader for product cards
 * Displayed during infinite scroll loading
 */
export const ContentSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-sm bg-(--card)">
      {/* Image skeleton */}
      <Skeleton className="aspect-3/4 w-full bg-(--muted)" />

      {/* Info skeleton */}
      <div className="p-4 space-y-2">
        <div className="flex items-end justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 bg-(--muted)" />
            <Skeleton className="h-3 w-1/2 bg-(--muted)" />
          </div>
          <Skeleton className="h-5 w-16 bg-(--muted)" />
        </div>
      </div>
    </div>
  );
};

/**
 * Grid of skeleton loaders
 */
interface ContentSkeletonGridProps {
  count?: number;
}

export const ContentSkeletonGrid = ({ count = 8 }: ContentSkeletonGridProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ContentSkeleton key={index} />
      ))}
    </>
  );
};
