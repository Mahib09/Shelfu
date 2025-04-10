"use client";
import { useManga } from "@/context/mangaContext";
import MangaCard from "@/components/app-mangaCard";
import { useEffect, useState } from "react";
import { Filter, Grid, List, SortDesc } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { TabsContent, TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MangaListCard from "@/components/app-mangaListCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SheetComponent from "@/components/app-sideSheet";
import { useUi } from "@/context/uiContext";
import ToolTip from "@/components/app-tooltip";
import { CollectionSkeleton } from "@/components/collectionSkeleton";
import { MangaListCardSkeleton } from "@/components/collectionListSkeleton";
import { motion } from "motion/react";
const Collection = () => {
  const [layout, setLayout] = useState("Grid");
  const [sort, setSort] = useState("Asc");
  const [filterQuery, setFilterQuery] = useState("");
  const [filterActive, setFilterActive] = useState();
  const [searchFilter, setSearchFilter] = useState("");
  const { loading, error, collection } = useManga();
  const { pageWidth } = useUi();
  useEffect(() => {
    setFilterActive(filterQuery !== "");
  }, [filterQuery]);

  const handleGrid = () => {
    setLayout("Grid");
  };
  const handleList = () => {
    setLayout("List");
  };
  const handleSortToggle = () => {
    sort === "Asc" ? setSort("Desc") : setSort("Asc");
  };

  const TabContentComponent = ({ value, className }) => {
    return (
      <TabsContent
        value={value}
        className={`flex flex-wrap gap-5 items-center ${
          layout === "Grid"
            ? "justify-around sm:justify-center"
            : "flex-col items-start"
        } ${className || ""}`}
      >
        {Array.isArray(collection) ? (
          collection
            .filter(
              (item) =>
                item.status === value &&
                item.volume.author
                  .toLowerCase()
                  .startsWith(filterQuery.toLowerCase()) &&
                item.volume.seriesName
                  .toLowerCase()
                  .startsWith(searchFilter.toLowerCase())
            )
            .sort((a, b) =>
              sort === "Asc"
                ? a.volume.seriesName.localeCompare(b.volume.seriesName)
                : b.volume.seriesName.localeCompare(a.volume.seriesName)
            )
            .map((item) => {
              const CardComponent =
                layout === "Grid" ? MangaCard : MangaListCard;

              return (
                <SheetComponent
                  key={item.userCollectionId}
                  item={item}
                  className="w-full"
                >
                  <CardComponent
                    src={item.volume.coverImageUrl}
                    title={item.volume.seriesName}
                    author={item.volume.author}
                    volumeNumber={item.volume.volumeNumber}
                    {...(layout !== "Grid" && {
                      description: item.volume.description,
                    })}
                  />
                </SheetComponent>
              );
            })
        ) : (
          <p>No Volumes Found</p>
        )}
      </TabsContent>
    );
  };
  return (
    <div className=" flex flex-col justify-center content-container ">
      <div className="flex items-center">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">
          Your Collection
        </h2>
        <ToolTip message={`${sort} Sort`} className="ml-auto">
          <div>
            <Toggle onClick={handleSortToggle}>
              <SortDesc />
            </Toggle>
          </div>
        </ToolTip>
        <ToolTip message={`Filter`}>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    filterActive
                      ? "text-blue-500 hover:text-blue-500"
                      : "text-primary"
                  }`}
                >
                  <Filter />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <div>
                  <Input
                    type="text"
                    placeholder="Filter By Author"
                    className="p-2"
                    value={filterQuery}
                    onChange={(e) => {
                      setFilterQuery(e.target.value);
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </ToolTip>

        <Input
          type="text"
          placeholder="Search"
          className="w-[30%]"
          value={searchFilter}
          onChange={(e) => {
            setSearchFilter(e.target.value);
          }}
        />
      </div>

      {/* content */}
      {error ? (
        <div className="p-2 h-screen">{error}</div>
      ) : (
        <div>
          <Tabs defaultValue="Owned" className="w-full pt-2">
            <div className="flex">
              <TabsList className="flex w-max  gap-1 sm:gap-3 justify-start items-center p-1 sm:p-2">
                <TabsTrigger
                  value="Owned"
                  className="flex gap-1 items-center text-xs sm:text-sm"
                >
                  Owned
                  <span className="text-accent-foreground">
                    {
                      collection.filter((item) => item.status === "Owned")
                        .length
                    }
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="Want_To_Buy"
                  className="flex gap-1 items-center text-xs sm:text-sm"
                >
                  Want To Buy
                  <span className="text-accent-foreground">
                    {
                      collection.filter((item) => item.status === "Want_To_Buy")
                        .length
                    }
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="For_Sale"
                  className="flex gap-1 items-center text-xs sm:text-sm"
                >
                  For Sale
                  <span className=" text-accent-foreground">
                    {
                      collection.filter((item) => item.status === "For_Sale")
                        .length
                    }
                  </span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex gap-1 items-center">
                <ToolTip message={`Grid View`}>
                  <div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleGrid}
                      className={`${
                        layout === "Grid" ? "text-purple-600" : ""
                      } w-7 h-7 sm:w-9 sm:h-9`}
                    >
                      <Grid />
                    </Button>
                  </div>
                </ToolTip>
                <ToolTip message={`List View`}>
                  <div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleList}
                      className={`${
                        layout === "List" ? "text-purple-600" : ""
                      } w-7 h-7 sm:w-9 sm:h-9`}
                    >
                      <List />
                    </Button>
                  </div>
                </ToolTip>
              </div>
            </div>
            {loading ? (
              layout === "Grid" ? (
                <CollectionSkeleton layout={layout} />
              ) : (
                <MangaListCardSkeleton />
              )
            ) : (
              <div className="mt-6 ">
                <TabContentComponent value="Owned" className="" />
                <TabContentComponent value="Want_To_Buy" className="mt-0" />
                <TabContentComponent value="For_Sale" className="mt-0" />
              </div>
            )}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Collection;
