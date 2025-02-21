import { useManga } from "@/context/mangaContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import MangaCard from "./app-mangaCard";

const MangaCarousel = () => {
  const { collection } = useManga();

  return (
    <Carousel className="carousel-container">
      <CarouselContent className="overflow p-2">
        <CarouselPrevious />
        {collection?.length > 0 ? (
          collection.map((item) => (
            <CarouselItem
              key={item.userCollectionId}
              className={`transition-all ${
                open ? "basis-[1/6]" : "basis-[1/6]"
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
          <div className="text-center text-gray-500">
            No items found in your collection.
          </div>
        )}
        <CarouselNext />
      </CarouselContent>
    </Carousel>
  );
};

export default MangaCarousel;
