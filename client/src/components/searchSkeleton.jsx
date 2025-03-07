import { Skeleton } from "@/components/ui/skeleton";

const SearchSkeleton = () => {
  return (
    <div className="w-[100%] flex flex-wrap gap-4 justify-center">
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="rounded-lg">
          <Skeleton className="h-[272px] w-[191px] rounded-md animate-pulse" />
          <Skeleton className="h-5 w-3/4 mt-2" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
