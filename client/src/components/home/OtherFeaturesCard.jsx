import { CheckCircle, Grid, Laptop2, Sun } from "lucide-react";
import Image from "next/image";
import React from "react";

const OtherFeaturesCard = () => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X position inside div
    const y = e.clientY - rect.top; // Mouse Y position inside div

    // Log to make sure values are correct
    console.log(`x: ${x}, y: ${y}`);

    // Set mouse position
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };
  const data = [
    {
      title: "No Setup Required",
      description: "Start adding manga instantly.",
      icon: CheckCircle, // Replace this with an <img> if needed
    },
    {
      title: "Dark Mode Available",
      description: "Read and browse comfortably at night.",
      icon: Sun,
    },
    {
      title: "Optimized for All Devices",
      description: "Works seamlessly on desktop, tablet, and mobile.",
      icon: Laptop2,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
      {data.map((feature, index) => (
        <div
          key={index}
          onMouseMove={handleMouseMove}
          className="relative isolate  rounded-lg  overflow-hidden flex-1 border p-6 flex flex-col items-center text-center h-full 
before:absolute before:rounded-full before:pointer-events-none before:transition-opacity before:w-16 before:h-16 before:-translate-x-1/2 before:-translate-y-1/2 
before:blur-[40px] before:opacity-0 before:group-hover:opacity-100 before:left-[var(--mouse-x)] before:top-[var(--mouse-y)] before:z-10 
after:absolute after:rounded-full after:pointer-events-none after:transition-opacity after:duration-500 after:w-20 after:h-20 after:-translate-x-1/2 after:-translate-y-1/2 
after:blur-[40px] after:opacity-0 after:hover:opacity-70 dark:after:hover:opacity-40 after:left-[var(--mouse-x)] after:top-[var(--mouse-y)] after:z-30 
after:bg-accent-foreground after:dark:bg-neutral-500"
        >
          <div className="flex items-center justify-center rounded-md">
            <span className="text-3xl">
              {
                <feature.icon
                  className="p-5 text-muted-foreground"
                  size={100}
                />
              }
            </span>
          </div>
          <div>
            <p className="mt-3 text-lg font-semibold">{feature.title}</p>
            <p className="text-xs text-muted-foreground mt-auto">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherFeaturesCard;
