"use client";
import React, { useState } from "react";
import { Card } from "./ui/card"; // Assuming you might want to use this for a styled card

const FeatureCard = () => {
  const [active, setActive] = useState("Dashboard");

  const data = [
    {
      key: "Dashboard",
      title: "Collection Dashboard",
      description: "View your entire collection at a glance.",
    },
    {
      key: "Tracking",
      title: "Smart Volume Tracking",
      description: "Track missing and upcoming volumes.",
    },
    {
      key: "Search",
      title: "Quick Search & Add",
      description: "Easily find and add new manga.",
    },
    {
      key: "Customization",
      title: "Customizable UI",
      description: "Organize your collection the way you like.",
    },
  ];

  return (
    <div className="flex p-2 mt-5 gap-10 w-full">
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item.key}
            className={`border cursor-pointer rounded-md shadow-md p-4 transition-all ${
              active === item.key ? "bg-accent  border-accent-foreground" : ""
            }`}
            onClick={() => {
              setActive(item.key);
            }}
          >
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center border rounded-lg shadow-md p-2">
        <p className="text-xl font-semibold">{active}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
