import Dashboard from "./Dashboard";

export const metadata = {
  title: "Dashboard | Shelfu",
  description:
    "Manage and organize your manga collection in a sleek dashboard interface.",
  keywords: ["manga", "collection", "dashboard", "management", "library"],
  og: {
    title: "Manga Collection Dashboard",
    description:
      "Manage and organize your manga collection in a sleek dashboard interface.",
    type: "website",
    image: "/images/dashboard-preview.png",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

const page = () => {
  return <Dashboard />;
};

export default page;
