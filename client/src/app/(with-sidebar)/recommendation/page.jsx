import React from "react";

const Recommendation = () => {
  return (
    <div className="flex h-[94vh]">
      <div className="m-auto flex flex-col items-center">
        <p>Coming Soon</p>
        <a
          className="text-secondary-foreground underline hover:text-accent-foreground"
          href="/dashboard"
        >
          Go back
        </a>
      </div>
    </div>
  );
};

export default Recommendation;
