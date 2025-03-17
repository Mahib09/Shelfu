"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const FeatureCard = () => {
  const [active, setActive] = useState("Dashboard");

  const data = [
    {
      key: "Dashboard",
      title: "Collection Dashboard",
      description:
        "Easily view and manage your entire manga collection in one place. Get an organized overview with detailed insights on your series, volumes, and reading progress.",
      imageUrl: "/images/dashboard.png", // Replace with actual image paths
    },
    {
      key: "Tracking",
      title: "Smart Volume Tracking",
      description:
        "Never lose track of your collection again! Monitor missing, upcoming, and owned volumes with real-time updates, so you always know what’s next to complete your series.",
      imageUrl: "/images/tracking.png", // Replace with actual image paths
    },
    {
      key: "Search",
      title: "Quick Search & Add",
      description:
        "Find your favorite manga effortlessly! Use powerful search filters to explore new titles and instantly add them to your collection with just one click.",
      imageUrl: "/images/search.png", // Replace with actual image paths
    },
    {
      key: "Customization",
      title: "Customizable UI",
      description:
        "Make it your own! Personalize your collection display, organize series with custom labels, and adjust settings to create a layout that fits your preferences.",
      imageUrl: "/images/customization.png", // Replace with actual image paths
    },
  ];

  return (
    <div className="flex flex-col md:flex-row p-4 mt-5 gap-10 w-full mx-auto max-w-8xl">
      {/* Left Side - Feature List */}
      <motion.div
        className="flex flex-col gap-4 w-full md:w-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {data.map((item) => (
          <motion.div
            key={item.key}
            role="button"
            aria-selected={active === item.key}
            className={`border cursor-pointer rounded-md shadow-md p-6 transition-all 
              ${
                active === item.key ? "bg-accent border-accent-foreground" : ""
              }`}
            onClick={() => setActive(active === item.key ? null : item.key)}
            layout
          >
            <h4 className="text-lg font-semibold">{item.title}</h4>

            <AnimatePresence>
              {active === item.key && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="overflow-hidden"
                  layout
                >
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="mt-4 rounded-lg w-full object-cover h-48 md:hidden"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Side - Active Feature Display (only for larger devices) */}
      <div className="hidden md:flex flex-1 items-center justify-center border rounded-lg shadow-md p-4 bg-secondary mt-4 md:mt-0">
        <p className="text-xl font-semibold">{active}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
