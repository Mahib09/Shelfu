import React from "react";
import Recommendation from "./Recommendation";

export const metadata = {
  title: "Recommendations | Shelfu",
  description:
    "Get personalized manga recommendations based on your collection and reading preferences powered by AI.",
  keywords: [
    "manga",
    "recommendations",
    "AI",
    "personalized recommendations",
    "manga collection",
    "reading suggestions",
  ],
  og: {
    title: "Manga Recommendations",
    description:
      "Get personalized manga recommendations based on your collection and reading preferences powered by AI.",
    type: "website",
    image: "/images/recommendation-preview.png",
  },
  robots: "index, follow",
};

const page = () => {
  return <Recommendation />;
};

export default page;
