import { Skeleton } from "@/components/ui/skeleton";

export const MangaListCardSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          className="border p-2 mx-4 md:mx-10 lg:mx-16 flex flex-row gap-4 rounded-sm shadow-md  w-full mt-8 "
        >
          {/* Skeleton for the whole div */}
          <Skeleton className="h-[110px] w-[80px] rounded-sm" />

          <div className="flex flex-col gap-3 justify-center w-full">
            {/* Skeleton for the title */}
            <Skeleton className="w-48 h-4" />

            {/* Skeleton for the author */}
            <Skeleton className="w-32 h-4" />

            {/* Skeleton for the description */}
            <Skeleton className="w-full h-12" />
          </div>
        </div>
      ))}
    </div>
  );
};
