import { Skeleton } from "@/components/ui/skeleton";

export const CollectionSkeleton = ({ layout }) => {
  return (
    <div
      className={`flex flex-row flex-wrap w-full items-center sm:p-2 pt-2 ${
        layout === "Grid"
          ? "justify-around sm:justify-center"
          : "flex-col items-start"
      } `}
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="p-4 rounded-lg">
          <Skeleton className="h-[250px] w-[160px] rounded-md animate-pulse" />
          <Skeleton className="h-5 w-3/4 mt-2" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </div>
      ))}
    </div>
  );
};
