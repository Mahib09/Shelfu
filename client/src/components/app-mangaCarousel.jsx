import { useManga } from "@/context/mangaContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import MangaCard from "./app-mangaCard";
import { useSidebar } from "./ui/sidebar";
const MangaCarousel = () => {
  const { open } = useSidebar();
  const { collection } = useManga();

  return (
    <Carousel
      className={`flex items-center ${
        open
          ? ` w-full md:w-[calc(100%-5rem)]`
          : `w-full md:w-[calc(100%-6.5rem)]`
      } h-fit transform translate-x-14 group`}
    >
      <CarouselContent className="-ml-8">
        {collection?.length > 0 ? (
          collection.map((item) => (
            <CarouselItem
              key={item.userCollectionId}
              className={`transition-all ${
                open ? " basis-[1/6]" : "basis-[1/6]"
              }`}
            >
              <MangaCard
                author={item.volume.author}
                vol={item.volume.volumeNumber}
                title={item.volume.seriesName}
                src={
                  item.volume?.coverImageUrl?.trim()
                    ? item.volume.coverImageUrl
                    : null
                }
                status={item.status}
              />
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <div className="text-center text-gray-500">
              No items found in your collection.
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="" />
      <CarouselNext className="" />
    </Carousel>
  );
};

export default MangaCarousel;
