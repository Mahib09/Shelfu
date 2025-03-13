import LandingPageHeader from "@/components/LandingPageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <main className="">
      <LandingPageHeader />
      <section className="container-wrapper">
        <div className="pt-8 lg:max-w-[900px] md:max-w-[700px] max-w-[600px] flex flex-col gap-3">
          <p className="text-sm font-medium flex items-center justify-centers gap-1 hover:underline cursor-pointer">
            Get Started with features{" "}
            <span>
              <ArrowRight className="text-primary" strokeWidth={1} size={18} />
            </span>
          </p>
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold">
              Your Personal Manga Collection, Organized Effortlessly!
            </h1>
            <h3 className="text-lg text-muted-foreground font-semibold">
              A beautifully designed, intuitive{" "}
              <span className="text-primary">manga collection manager</span>{" "}
              that helps you organize, track, and discover manga effortlessly.
              Works with your favorite reading habits.
            </h3>
            <h3 className="text-lg font-semibold">
              Open Source. Open for All.
            </h3>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <button
                className="px-5 flex gap-2 items-center justify-center py-2 bg-accent-foreground text-white rounded-3xl hover:bg-purple-600 transition-colors ease-in-out "
                onClick={() => router.push("/auth/signup")}
              >
                Get Started now
                <span>
                  <ArrowRight strokeWidth={1} />
                </span>
              </button>
              <Button
                variant="secondary"
                onClick={() => router.push("/auth/login")}
              >
                Log In
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By manga collectors, for manga collectors.
            </p>
          </div>
        </div>
      </section>
      <section className="border border-dashed p-0 m-0">
        <div className="container-wrapper flex  items-center">
          <div className="">
            <h1 className="text-2xl font-bold">Title here</h1>
          </div>
        </div>
      </section>
      <section className="container-wrapper">
        <div className="border w-max">
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
