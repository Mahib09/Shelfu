import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LayoutDashboard,
  LibraryBig,
  Search,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();

  return (
    <main className="">
      <section className="flex flex-col md:flex-row gap-8 md:gap-24 items-start  md:items-end px-8 md:px-20 pt-20 max-w-[1154px] m-auto">
        <div className=" flex flex-col gap-4">
          <p className="text-muted-foreground font-medium text-sm md:text-base">
            Built for Manga Collectors, by a Manga Collector.
          </p>
          <h1 className="md:text-6xl text-4xl font-bold">
            Never Lose Track of Your Manga Collection Again.
          </h1>
          <p className="font-medium pt-8 text-xl text-muted-foreground">
            Meet ShelfU — the ultimate manga collection organizer app designed
            to
            <span className="text-primary">
              {" "}
              organize, track, and keep track of what you love
            </span>
            . Built by lifelong manga lovers.
          </p>
          <div>
            <button className="py-2 px-5 bg-accent-foreground text-white rounded-3xl flex gap-2 items-center justify-center">
              Get Started <ArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section className="h-screen mt-6 md:mt-8 px-8 md:px-20 py-5">
        <div className="rounded-md bg-accent">
          <Image
            width={2000}
            height={1000}
            src="/Landingpage/dashboardLight.png"
            alt="Dashboard"
            className="rounded-lg p-4"
          />
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-6 md:px-20 py-5">
        <div className="border-t flex flex-col gap-4">
          <LayoutDashboard className="mt-6" />
          <h4 className="text-lg font-semibold">Dashboard</h4>
          <p className="text-sm text-muted-foreground">
            Get an at-a-glance view of your entire manga universe. The ShelfU
            Dashboard shows your total volumes, completed series, ongoing reads,
            and favorites. It's your personal manga control center — clean,
            minimal, and built for collectors.
          </p>
        </div>
        <div className="border-t flex flex-col gap-4">
          <LibraryBig className="mt-6" />
          <h4 className="text-lg font-semibold">Collection</h4>
          <p className="text-sm text-muted-foreground">
            Easily add, edit, or remove manga from your personal Collection.
            Organize by title, author, volume count, or status (Reading,
            Completed, On Hold). Whether your shelf is digital or physical,
            ShelfU keeps everything in sync and beautifully displayed.
          </p>
        </div>
        <div className="border-t flex flex-col gap-4">
          <Search className="mt-6" />
          <h4 className="text-lg font-semibold">Smart Search</h4>
          <p className="text-sm text-muted-foreground">
            Find any manga in seconds. ShelfU’s Search lets you look up titles,
            authors, or genres across your entire collection — even if it’s
            huge. Use filters to sort by status, rating, or unread volumes to
            stay on top of your reading goals.
          </p>
        </div>
        <div className="border-t flex flex-col gap-4">
          <Sparkles className="mt-6" />
          <h4 className="text-lg font-semibold"> Recommendations</h4>
          <p className="text-sm text-muted-foreground">
            Not sure what to read next? The Recommendation engine suggests new
            manga based on what you’ve read, rated, or favorited. Discover
            hidden gems and popular picks tailored to your collection and
            reading style.
          </p>
        </div>
      </section>

      <section className="mt-12 bg-primary text-primary-foreground  px-8 md:px-20 py-5">
        <div className="w-full flex flex-col md:flex-row mt-12">
          <h3 className="text-4xl md:text-6xl font-bold w-2/3">
            Keep Track of your Collection Your way!!!
          </h3>
        </div>
        <div className="relative flex flex-col md:flex-row w-full mt-12 gap-6">
          <div className="flex flex-col  md:w-1/2 items-start gap-5 z-10">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae repellendus cum quas ipsum. Veniam reprehenderit cumque
              vel soluta consequuntur voluptates quam ipsam eligendi magni.
              Itaque mollitia aspernatur necessitatibus id. Libero.
            </p>
            <button className="py-3 px-5 bg-accent-foreground text-white rounded-md">
              Get Started
            </button>
            <p className="md:mt-auto">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
              quo inventore voluptate dicta animi magni sint sunt repudiandae
              numquam, vel ab commodi ipsam esse sit. Molestias nihil eos iusto
              repellendus!
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
              quo inventore voluptate dicta animi magni sint sunt repudiandae
              numquam, vel ab commodi ipsam esse sit. Molestias nihil eos iusto
              repellendus!
            </p>
          </div>

          <div className="bg-secondary md:w-1/2  md:absolute top-0 -right-20 z-0 rounded-md rounded-r-none">
            <Image
              src="/LandingPage/collectionLight.png"
              height={2000}
              width={2000}
              className="p-4 pr-0 "
            />
          </div>
        </div>
      </section>
      <section className=" bg-primary text-secondary px-8 md:px-20 py-20">
        <div className="w-full flex flex-col mt-12">
          <h3 className="text-8xl font-bold w-2/3">Stay in sync!!</h3>
          <p className="mt-6">
            Never double-buy again. Keep track of your volumes, series, and
            reading progress — on desktop, tablet, or mobile. Your data is
            always with you.
          </p>
        </div>
        <div className="h-[80vh] bg-secondary rounded-md mt-12"></div>
      </section>
      <section className="px-8 md:px-20 py-5">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="bg-secondary rounded-md h-[30vh] md:h-[80vh]  md:w-1/2 sticky top-10 md:top-20 z-0"></div>
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
      <section className=" py-5 h-[50vh]">
        <div className="grid grid-cols-3 gap-6 h-full">
          <div className="bg-secondary rounded-md"></div>
          <div className="bg-secondary rounded-md"></div>
          <div className="bg-secondary rounded-md"></div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
