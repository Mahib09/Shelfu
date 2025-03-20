import LandingPageHeader from "@/components/LandingPageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import FeatureCard from "@/components/featureCard";
import { AnimatePresence, motion } from "motion/react";
import OtherFeaturesCard from "@/components/home/OtherFeaturesCard";
const HomePage = () => {
  const router = useRouter();

  return (
    <main className="">
      <LandingPageHeader />
      <motion.section
        className="border border-dashed border-y-0 border-x-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }} // Overall fade-in
      >
        <div className="container-wrapper">
          <div className="pt-8 lg:max-w-[900px] md:max-w-[700px] max-w-[600px] flex flex-col gap-3">
            <motion.p
              className="text-sm font-medium flex gap-1 hover:underline cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} // Staggered fade-in
            >
              Get Started with features{" "}
              <span>
                <ArrowRight
                  className="text-primary"
                  strokeWidth={1}
                  size={18}
                />
              </span>
            </motion.p>
            <div className="flex flex-col gap-3">
              <motion.h1
                className="text-5xl md:text-6xl font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }} // Staggered fade-in
              >
                Your Personal Manga Collection, Organized Effortlessly!
              </motion.h1>
              <motion.h3
                className="text-lg text-muted-foreground font-semibold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }} // Staggered fade-in
              >
                A beautifully designed, intuitive{" "}
                <span className="text-primary">manga collection manager</span>{" "}
                that helps you organize, track, and discover manga effortlessly.
                Works with your favorite reading habits.
              </motion.h3>
              <motion.h3
                className="text-lg font-semibold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }} // Staggered fade-in
              >
                Open Source. Open for All.
              </motion.h3>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <motion.button
                  className="px-5 flex gap-2 items-center justify-center py-2 bg-accent-foreground text-white rounded-3xl hover:bg-purple-600 transition-colors ease-in-out"
                  onClick={() => router.push("/auth/signup")}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1 }} // Staggered fade-in
                >
                  Get Started now
                  <span>
                    <ArrowRight strokeWidth={1} />
                  </span>
                </motion.button>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1.2 }} // Staggered fade-in
                >
                  <Button
                    variant="secondary"
                    onClick={() => router.push("/auth/login")}
                  >
                    Log In
                  </Button>
                </motion.div>
              </div>
              <motion.p
                className="text-xs text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.4 }} // Staggered fade-in
              >
                By manga collectors, for manga collectors.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="border border-dashed border-b-0 border-x-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }} // Fade-in and slide-down
      >
        <div className="container-wrapper">
          <div className="py-10">
            <h1 className="text-4xl font-semibold gradient-text py-2">
              Everything You Need, All in One Place
            </h1>
            <FeatureCard />
          </div>
        </div>
      </motion.section>
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
            <OtherFeaturesCard />
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
