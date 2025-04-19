import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LayoutDashboard } from "lucide-react";

const HomePage = () => {
  const router = useRouter();

  return (
    <main className="">
      <section className="flex flex-col md:flex-row gap-8 md:gap-24 items-start  md:items-end px-8 md:px-20 py-5">
        <div className="md:w-2/3 flex flex-col gap-8">
          <p className="text-muted-foreground font-medium text-sm ms:text-normal">
            Built for Manga Collectors, by a Manga Collector.
          </p>
          <h1 className="md:text-7xl text-4xl font-bold">
            Never Lose Track of Your Manga Collection Again.
          </h1>
          <p className="font-medium">
            Track, manage, and cherish your growing manga collection — all in
            one place
          </p>
        </div>
        <div className=" flex md:w-1/3 text-lg gap-5">
          <button className="py-3 px-5 bg-accent-foreground text-white rounded-md">
            Get Started
          </button>
          <button className="flex items-center justify-center">
            Login <ArrowRight />{" "}
          </button>
        </div>
      </section>
      <section className="h-screen mt-6 md:mt-12 px-8 md:px-20 py-5">
        <div className="bg-secondary rounded-md h-full"></div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-6 md:px-20 py-5">
        <div className="border-t flex flex-col gap-4">
          <LayoutDashboard className="mt-6" />
          <h4 className="text-lg font-semibold">Dashboard</h4>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            possimus ex quasi quo sequi, non magnam, hic voluptas molestiae
            tenetur deleniti aliquid natus eos expedita iure rerum. Explicabo,
            facilis libero.
          </p>
        </div>
        <div className="border-t flex flex-col gap-4">
          <LayoutDashboard className="mt-6" />
          <h4 className="text-lg font-semibold">Dashboard</h4>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            possimus ex quasi quo sequi, non magnam, hic voluptas molestiae
            tenetur deleniti aliquid natus eos expedita iure rerum. Explicabo,
            facilis libero.
          </p>
        </div>
        <div className="border-t flex flex-col gap-4">
          <LayoutDashboard className="mt-6" />
          <h4 className="text-lg font-semibold">Dashboard</h4>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            possimus ex quasi quo sequi, non magnam, hic voluptas molestiae
            tenetur deleniti aliquid natus eos expedita iure rerum. Explicabo,
            facilis libero.
          </p>
        </div>
        <div className="border-t flex flex-col gap-4">
          <LayoutDashboard className="mt-6" />
          <h4 className="text-lg font-semibold">Dashboard</h4>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            possimus ex quasi quo sequi, non magnam, hic voluptas molestiae
            tenetur deleniti aliquid natus eos expedita iure rerum. Explicabo,
            facilis libero.
          </p>
        </div>
      </section>

      <section className="mt-12 bg-primary text-primary-foreground  px-8 md:px-20 py-5">
        <div className="w-full flex flex-col md:flex-row mt-12">
          <h3 className="text-4xl md:text-8xl font-bold w-2/3">
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

          <div className="bg-secondary md:w-1/2 h-[500px] md:absolute top-0 -right-20 z-0 rounded-md"></div>
        </div>
      </section>
      <section className=" bg-primary text-secondary px-20 py-5">
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
      <section className="px-20 py-5">
        <div className="flex gap-12">
          <div className="bg-secondary rounded-md h-[80vh] w-1/2 sticky top-20 z-0"></div>
          <div className="flex flex-col w-1/2">
            <div className="my-80">
              <h4>Stay in sync</h4>
              <p>
                Never double-buy again. Keep track of your volumes, series, and
                reading progress — on desktop, tablet, or mobile. Your data is
                always with you.
              </p>
            </div>
            <div className="my-80">
              <h4>Stay in sync</h4>
              <p>
                Never double-buy again. Keep track of your volumes, series, and
                reading progress — on desktop, tablet, or mobile. Your data is
                always with you.
              </p>
            </div>
            <div className="my-80">
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
      <section className="px-20 py-5 h-screen">
        <div className="flex items-start justify-start mt-20">
          <div className="w-2/3 flex flex-col gap-6 items-start">
            <h3 className="text-6xl font-bold ">
              Ready to organize your shelf?
            </h3>
            <button className="py-3 px-5 bg-accent-foreground text-white rounded-md">
              Get Started
            </button>
          </div>
          <div className="w-1/3">
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
