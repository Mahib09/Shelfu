import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import React, { useState } from "react";

const FeatureCard = () => {
  const { theme } = useTheme();
  const data = [
    {
      key: "Dashboard",
      title: "Collection Dashboard",
      description:
        "Easily view and manage your entire manga collection in one place. Get an organized overview with detailed insights on your series, volumes, and reading progress.",
      imageUrl: "/feature-dashboard.png",
      darkmodeImageUrl: "/feature-dashboard-dark.png",
    },
    {
      key: "Tracking",
      title: "Smart Volume Tracking",
      description:
        "Never lose track of your collection again! Monitor missing, upcoming, and owned volumes with real-time updates, so you always know what’s next to complete your series.",
      imageUrl: "/feature-collection.png",
      darkmodeImageUrl: "/feature-collection-dark.png",
    },
    {
      key: "Search",
      title: "Quick Search & Add",
      description:
        "Find your favorite manga effortlessly! Use powerful search filters to explore new titles and instantly add them to your collection with just one click.",
      imageUrl: "/feature-search.png",
      darkmodeImageUrl: "/feature-search-dark.png",
    },
    {
      key: "Customization",
      title: "Customizable UI",
      description:
        "Make it your own! Personalize your collection display, organize series with custom labels, and adjust settings to create a layout that fits your preferences.",
      imageUrl: "/feature-ui.png",
      darkmodeImageUrl: "/feature-ui-dark.png", // Replace with actual image paths
    },
  ];

  const [active, setActive] = useState(data[0]);

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
            aria-selected={active.key === item.key}
            className={`border cursor-pointer rounded-md shadow-md p-6 transition-all 
              ${
                active.key === item.key
                  ? "bg-accent border-accent-foreground"
                  : ""
              }`}
            onClick={() => setActive(item)}
            layout
          >
            <h4 className="text-lg font-semibold">{item.title}</h4>

            <AnimatePresence>
              {active.key === item.key && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="overflow-hidden flex flex-col justify-center items-center"
                  layout
                >
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                  <Image
                    src={
                      theme === "light" ? item.imageUrl : item.darkmodeImageUrl
                    }
                    alt={item.title}
                    width={500}
                    height={500}
                    className="mt-4 rounded-lg md:hidden"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Side - Active Feature Display (only for larger devices) */}

      {active && (
        <motion.div
          className="hidden md:flex flex-1 items-center justify-center border rounded-lg shadow-md p-4  mt-4 md:mt-0"
          key={active.key}
        >
          <div className="bg-secondary rounded-lg overflow-hidden">
            <motion.div
              className="rounded-lg"
              initial={{ scale: 1.2, opacity: 0 }} // Start larger and invisible for new image
              animate={{ scale: 1, opacity: 1 }} // New image scales to normal size and fades in
              exit={{ scale: 0.8, opacity: 0 }} // Shrinks back and fades out
              transition={{ duration: 1 }}
            >
              <Image
                src={
                  theme === "light" ? active.imageUrl : active.darkmodeImageUrl
                }
                alt={active.title}
                width={800}
                height={800}
                className="rounded-lg shadow-md object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FeatureCard;
