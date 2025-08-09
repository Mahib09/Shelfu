import { ArrowRight } from "lucide-react";
import React from "react";
import LandingHeadBar from "../LandingPageHeader";
import Link from "next/link";
import { Button } from "../ui/button";

const OneScreenHero = () => {
  return (
    <>
      <div
        className="fixed inset-0 -z-10 filter blur-[70px]"
        style={{
          background: `
          radial-gradient(circle at 20% 30%, rgba(255, 190, 180, 0.4), transparent 40%),
          radial-gradient(circle at 70% 50%, rgba(180, 190, 255, 0.3), transparent 50%),
          radial-gradient(circle at 50% 70%, rgba(220, 210, 200, 0.5), transparent 30%)
        `,
        }}
      ></div>
      <LandingHeadBar />
      <div className="h-screen flex items-center">
        <div className=" flex flex-col gap-4 text-center px-10 py-10 md:py-20 -mt-16">
          <p className="text-muted-foreground font-medium text-sm md:text-base">
            Built for Manga Collectors, by a Manga Collector.
          </p>
          <h1 className="md:text-7xl text-4xl font-bold text-gray-800 dark:text-white">
            Never Lose Track of Your Manga Collection Again
          </h1>
          <p className=" text-muted-foreground">
            Meet ShelfU — the ultimate manga collection organizer app designed
            to <br></br>
            <span className="text-primary">
              {" "}
              organize, track, and keep track of what you love
            </span>
            . Built by lifelong manga lovers.
          </p>
          <div className="m-auto py-4">
            <Link href="/auth/login">
              <Button variant="accent" className="p-4 shadow-lg">
                Get Started <ArrowRight className="" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneScreenHero;
