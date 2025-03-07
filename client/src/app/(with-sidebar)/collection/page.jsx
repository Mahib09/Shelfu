import Collection from "./Collection";

export const metadata = {
  title: "Collection | Shelfu",
  description: "Browse, manage, and organize your manga collection with ease.",
  keywords: ["manga", "collection", "manage", "organize", "library"],
  og: {
    title: "Your Manga Collection",
    description:
      "Browse, manage, and organize your manga collection with ease.",
    type: "website",
    image: "/images/collection-preview.png",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};
const page = () => {
  return <Collection />;
};

export default page;
