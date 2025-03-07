import Search from "./Search";

export const metadata = {
  title: "Search Volumes | Shelfu",
  description:
    "Find your favorite manga from a vast library and add them to your collection.",
  keywords: ["manga", "search", "manga library", "find", "collection"],
  og: {
    title: "Search Manga",
    description:
      "Find your favorite manga from a vast library and add them to your collection.",
    type: "website",
    image: "/images/search-preview.png",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

const page = () => {
  return <Search />;
};

export default page;
