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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex flex-col justify-center">
      <div className="flex p-2 m-2 gap-1 items-center">
        <h2 className="font-medium text-xl md:text-3xl text-gray-600">
          Your Collection
        </h2>
        <Toggle className="ml-auto" onClick={handleSortToggle}>
          <SortDesc />
        </Toggle>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`${
                filterActive
                  ? "text-blue-500 hover:text-blue-500"
                  : "text-black"
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
      <div>
        <Tabs defaultValue="owned" className="w-full p-2">
          <div className="flex">
            <TabsList className="flex w-max gap-3 justify-start items-center p-2">
              <TabsTrigger value="owned">Owned</TabsTrigger>
              <TabsTrigger value="wantobuy">Want To Buy</TabsTrigger>
              <TabsTrigger value="forsale">For Sale </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex gap-1">
              <Button variant="outline" size="icon" onClick={handleGrid}>
                <Grid />
              </Button>
              <Button variant="outline" size="icon" onClick={handleList}>
                <List />
              </Button>
            </div>
          </div>

          <TabsContent
            value="owned"
            className={`flex flex-wrap gap-2 items-center justify-around sm:justify-center w-${pageWidth} ${
              layout === "List"
                ? "flex-col justify-start items-start w-full"
                : "flex-row"
            }`}
          >
            {Array.isArray(collection) ? (
              collection
                .filter(
                  (item) =>
                    item.status === "Owned" &&
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
                    <SheetComponent key={item.userCollectionId} item={item}>
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
          <TabsContent
            value="wantobuy"
            className="flex flex-wrap md:flex-row gap-2 items-center justify-around sm:justify-center mt-0"
          >
            {Array.isArray(collection) ? (
              collection
                .filter(
                  (item) =>
                    item.status === "Want_To_Buy" &&
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
                    <SheetComponent key={item.userCollectionId} item={item}>
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
          <TabsContent
            value="forsale"
            className="flex flex-wrap md:flex-row gap-2 items-center justify-around sm:justify-center mt-0"
          >
            {Array.isArray(collection) ? (
              collection
                .filter(
                  (item) =>
                    item.status === "For_Sale" &&
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
                    <SheetComponent key={item.userCollectionId} item={item}>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Collection;
