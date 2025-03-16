import LandingPageHeader from "@/components/LandingPageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import FeatureCard from "@/components/featureCard";

const HomePage = () => {
  const router = useRouter();

  return (
    <main className="">
      <LandingPageHeader />
      <section className="border border-dashed border-y-0 border-x-0">
        <div className="container-wrapper">
          <div className="pt-8 lg:max-w-[900px] md:max-w-[700px] max-w-[600px] flex flex-col gap-3">
            <p className="text-sm font-medium flex items-center justify-centers gap-1 hover:underline cursor-pointer">
              Get Started with features{" "}
              <span>
                <ArrowRight
                  className="text-primary"
                  strokeWidth={1}
                  size={18}
                />
              </span>
            </p>
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl md:text-6xl font-medium">
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
        </div>
      </section>

      <section className="border border-dashed border-b-0 border-x-0">
        <div className="container-wrapper ">
          <div className="py-10">
            <h1 className="text-4xl font-semibold gradient-text py-2">
              Everything You Need, All in One Place
            </h1>
            <FeatureCard />
          </div>
        </div>
      </section>
      <section className="border border-dashed border-b-0 border-x-0">
        <div className=" container-wrapper ">
          <div className="py-10">
            <h1 className="text-4xl font-semibold gradient-text py-2">
              Your Collection, Your Way
            </h1>
            <p>
              Manga collecting is personal, and ShelfU adapts to your reading
              habits. Whether you're tracking a few series or building an
              extensive library, we provide the tools you need to stay
              organized.
            </p>
          </div>
        </div>
      </section>
      <section className="border border-dashed p-0  m-0 border-b-0 border-x-0">
        <div className="container-wrapper flex  items-center">
          <div className="flex flex-col gap-2 py-10 w-full ">
            <h1 className="text-4xl font-semibold gradient-text">
              Optimized for a Seamless Experience
            </h1>
            <p className="text-muted-foreground">
              Our beautifully designed UI ensures that managing your collection
              is both fast and intuitive.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
              {[
                {
                  title: "No Setup Required",
                  description: "Start adding manga instantly.",
                  icon: "📖", // Replace this with an <img> if needed
                },
                {
                  title: "Dark Mode Available",
                  description: "Read and browse comfortably at night.",
                  icon: "🌙",
                },
                {
                  title: "Optimized for All Devices",
                  description:
                    "Works seamlessly on desktop, tablet, and mobile.",
                  icon: "📱",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="border p-6  rounded-md flex flex-col items-center text-center h-full"
                >
                  <div className=" h-24 w-24 flex items-center justify-center rounded-md">
                    <span className="text-3xl">{feature.icon}</span>{" "}
                    {/* Replace with <img> if needed */}
                  </div>
                  <div className="">
                    <p className="mt-3 text-lg font-semibold">
                      {feature.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-auto">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border border-dashed p-0  m-0 border-x-0">
        <div className="container-wrapper">
          <div className="flex flex-col gap-5 sm:flex-row justify-center sm:items-center">
            <div className="py-2">
              <h2 className="text-5xl md:text-6xl font-medium gradient-text py-2">
                Ready to take control of <br></br> your manga collection?
              </h2>
            </div>
            <div className="md:ml-auto flex flex-col sm:items-center justify-center">
              <button
                className="px-5 flex gap-2 items-center justify-center py-2 bg-accent-foreground text-white rounded-3xl hover:bg-purple-600 transition-colors ease-in-out "
                onClick={() => router.push("/auth/signup")}
              >
                Get Started now
                <span>
                  <ArrowRight strokeWidth={1} />
                </span>
              </button>
              <p className="text-xs text-muted-foreground">
                Start organizing today—no setup required!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
