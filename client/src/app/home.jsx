import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LayoutDashboard,
  LibraryBig,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();

  return (
    <main className="">
      <Image
        src="/spines.png"
        width={400}
        height={400}
        className="absolute -right-52 drop-shadow-2xl"
      />
      <Image
        src="/spines.png"
        width={400}
        height={400}
        className="absolute -left-52 bottom-2"
      />
      <Hero />
      <Insights />
      <FeaturesTrack />
      <FeatureSync />
      <StickyCarousel />
      <FeaturesCard />

      <section className="px-8 md:px-20 py-5 h-screen">
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start mt-20">
          <div className="md:w-2/3 flex flex-col gap-6 items-center md:items-start">
            <h3 className="text-6xl font-bold ">
              Ready to organize your shelf?
            </h3>
            <button className="py-3 px-5 bg-accent-foreground text-white rounded-md">
              Get Started
            </button>
          </div>
          <div className="md:w-1/3 flex md:block md:flex-wrap">
            <p className="p-6 border-b">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
              accusantium officia quaerat at repudiandae asperiores eum, eaque
              quia amet, maxime explicabo corrupti impedit veniam sed?
              Temporibus itaque excepturi nam. Natus.
            </p>
            <p className="p-6 border-b">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
              accusantium officia quaerat at repudiandae asperiores eum, eaque
              quia amet, maxime explicabo corrupti impedit veniam sed?
              Temporibus itaque excepturi nam. Natus.
            </p>
            <p className="p-6">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
              accusantium officia quaerat at repudiandae asperiores eum, eaque
              quia amet, maxime explicabo corrupti impedit veniam sed?
              Temporibus itaque excepturi nam. Natus.
            </p>
          </div>
        </div>
      </section>
      <section className=" py-5 h-[50vh]"></section>
    </main>
  );
};

function Hero() {
  return (
    <section className=" bg-stone-50 dark:bg-stone-900 rounded-3xl mx-10 md:mx-16 mt-8">
      <div className=" flex flex-col gap-4 text-center px-10 py-10 md:py-20">
        <p className="text-muted-foreground font-medium text-sm md:text-base">
          Built for Manga Collectors, by a Manga Collector.
        </p>
        <h1 className="md:text-7xl text-4xl font-bold">
          Never Lose Track of Your Manga Collection Again
        </h1>
        <p className=" text-muted-foreground">
          Meet ShelfU — the ultimate manga collection organizer app designed to{" "}
          <br></br>
          <span className="text-primary">
            {" "}
            organize, track, and keep track of what you love
          </span>
          . Built by lifelong manga lovers.
        </p>
        <div className="m-auto py-4">
          <button className="py-2 px-5 bg-accent text-white rounded-lg text-lg flex gap-2 items-center justify-center">
            Get Started <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="mx-10 md:mx-16 my-28">
      <div className="flex w-full">
        <div className="w-2/3">
          <p className="text-4xl font-bold">
            Unlock Your Manga Collection’s<br></br> Full Potential{" "}
            <span className="text-muted-foreground">
              — Discover Details <br />
              Others Overlook
            </span>
          </p>
          <div className="m-auto py-4">
            <button className="py-2 px-5 bg-accent text-white rounded-lg text-lg flex gap-2 items-center justify-center">
              Get Started <ArrowRight />
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-slate-400 "></div>
      </div>
    </section>
  );
}

function FeaturesTrack() {
  return (
    <section className="mt-12 bg-[#0667d9] text-white px-8 md:px-20 py-5">
      <div className="w-full flex flex-col md:flex-row mt-12">
        <h3 className="text-4xl md:text-6xl font-bold w-2/3">
          Keep Track of your Collection Your way!!!
        </h3>
      </div>
      <div className="relative flex flex-col md:flex-row w-full mt-12 gap-6">
        <div className="flex flex-col  md:w-1/2 items-start gap-5">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            repellendus cum quas ipsum. Veniam reprehenderit cumque vel soluta
            consequuntur voluptates quam ipsam eligendi magni. Itaque mollitia
            aspernatur necessitatibus id. Libero.
          </p>
          <p className="md:mt-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quo
            inventore voluptate dicta animi magni sint sunt repudiandae numquam,
            vel ab commodi ipsam esse sit. Molestias nihil eos iusto
            repellendus!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quo
            inventore voluptate dicta animi magni sint sunt repudiandae numquam,
            vel ab commodi ipsam esse sit. Molestias nihil eos iusto
            repellendus!
          </p>
        </div>

        <div className="bg-[#0052ae] md:w-1/2  md:absolute top-0 -right-20 z-0 rounded-2xl rounded-r-none">
          <Image
            src="/LandingPage/collectionLight.png"
            height={2000}
            width={2000}
            className="p-6 pr-0 "
          />
        </div>
      </div>
    </section>
  );
}

function FeatureSync() {
  return (
    <section className=" bg-[#0667d9] text-white px-8 md:px-20 py-20">
      <div className="w-full flex flex-col mt-16">
        <h3 className="text-8xl font-bold w-2/3">Stay in sync!!</h3>
        <p className="mt-6">
          Never double-buy again. Keep track of your volumes, series, and
          reading progress — on desktop, tablet, or mobile. Your data is always
          with you.
        </p>
      </div>
      <div className="h-[80vh] bg-[#0052ae]  rounded-md mt-12"></div>
    </section>
  );
}

function StickyCarousel() {
  return (
    <section className="bg-[#8b045c] px-8 md:px-20 py-20">
      <div className="flex flex-col md:flex-row gap-12 text-white">
        <div className="bg-[#3a0226] rounded-md h-[30vh] md:h-[80vh]  md:w-1/2 sticky top-10 md:top-20 z-0"></div>
        <div className="flex flex-col md:w-1/2">
          <div className="my-60 md:my-80">
            <h4>Stay in sync</h4>
            <p>
              Never double-buy again. Keep track of your volumes, series, and
              reading progress — on desktop, tablet, or mobile. Your data is
              always with you.
            </p>
          </div>
          <div className="my-60 md:my-80">
            <h4>Stay in sync</h4>
            <p>
              Never double-buy again. Keep track of your volumes, series, and
              reading progress — on desktop, tablet, or mobile. Your data is
              always with you.
            </p>
          </div>
          <div className="my-60 md:my-80">
            <h4>Stay in sync</h4>
            <p>
              Never double-buy again. Keep track of your volumes, series, and
              reading progress — on desktop, tablet, or mobile. Your data is
              always with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesCard() {
  return (
    <section className="px-8 md:px-20 py-40">
      <div className="flex gap-20 flex-col">
        <div className="flex gap-8">
          <div>
            <h3 className="text-4xl font-semibold">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestiae, sed doloremque.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              repudiandae sit quia? Laborum suscipit deserunt eaque libero
              ratione quis nemo tenetur assumenda quasi provident facere et
              mollitia, eos consectetur dicta?
            </p>
            <div className="m-auto py-4">
              <button className="py-2 px-5 bg-accent text-white rounded-lg text-lg flex gap-2 items-center justify-center">
                Get Started <ArrowRight />
              </button>
            </div>
          </div>
          <div className="bg-slate-100 w-2/3"></div>
        </div>

        <div className="grid grid-cols-3 gap-6 h-[50vh]">
          <div className="bg-secondary rounded-md"></div>
          <div className="bg-secondary rounded-md"></div>
          <div className="bg-secondary rounded-md"></div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
