import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <div className="  " bis_skin_checked="1">
      <Hero />
      <HeadTab />
      <Solve />
      <DashboardGrid />
      <HowItWorks />
      <SocialProof />
      <ByeCTA />
    </div>
  );
};

export default LandingPage;

const Hero = () => {
  return (
    <section className="landingContainer md:mt-28 mt-11 relative z-10">
      <div className="sm:flex sm:flex-col  z-20 hidden gap-5">
        <h1 className="mt-2 text-[#F7F8F8] md:text-[4rem] text-5xl  sm:tracking-tighter font-semibold md:mt-1">
          Shelfu is a purpose-built tool for tracking and showcasing your manga
          collection
        </h1>
        <h3 className="text-md tracking-tight text-muted-foreground  text-[#7E838B] md:max-w-[500px] text-lg font-[400]">
          Meet the ultimate manga collection organizer app designed to organize,
          track, and keep track of your precious collection.
        </h3>
        <CtaBtn to="/auth/login">Get Started</CtaBtn>
      </div>

      <div className="relative sm:hidden items-center flex flex-col w-full text-center gap-6">
        <h1 className=" text-[#F7F8F8] max-w-[450px] text-[2.5rem] tracking-tighter leading-tight font-semibold text-balance">
          Track your manga collection
        </h1>

        <h3 className="text-md tracking-tight leading-tight text-muted-foreground  text-[#7E838B] text-lg">
          Shelfu is a purpose-built tool for tracking and showcasing your manga
          collection.{" "}
          <span className="block xs:inline">
            Simplify tracking, organizing, and enjoying manga.
          </span>
        </h3>
        <CtaBtn to="/auth/login">Get Started</CtaBtn>
      </div>
    </section>
  );
};
const HeadTab = () => {
  return (
    <div className="landingContainer mt-10 md:mt-20">
      <div className="relative rounded-lg border border-b-0 rounded-b-none p-1 overflow-hidden">
        <Image
          src="/Landingpage/collection.png"
          width={3000}
          height={500}
          className="rounded-lg"
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] to-transparent" />
      </div>
    </div>
  );
};
const Solve = () => {
  return (
    <section className="mt-20">
      <div className="text-xl font-medium text-center">
        <h5>Powering the world's largest collections.</h5>
        <h5 className="text-[#7E838B]">
          Say Bye to Your Notebooks, Google Sheets, Notion Notes and Pictures.
        </h5>
      </div>
      <div className="flex justify-around mt-8 p-4">
        <Image src="/Landingpage/no.png" width={800} height={500} />
      </div>
    </section>
  );
};
const DashboardGrid = () => {
  return (
    <section className=" mt-44 bg-gradient-to-b from-[#141516] via-[#08090A] to-[#08090A]">
      <div className="landingContainer">
        <div className="pt-24">
          <h2 className="text-5xl font-semibold">AI-driven Dashboard</h2>
          <p className="mt-8 max-w-[500px] font-medium text-lg text-[#7E838B]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            perferendis quod officia ex modi?
          </p>
          <div className="h-72 bg-[#141516] my-20 rounded-xl"></div>
          <div className="md:border-2 border-b-2 md:border-x-0 flex flex-col md:flex-row">
            <div className="md:border-r pt-20 pb-28  md:pr-14">
              <h3 className="text-xl font-medium leading-tight tracking-tighter">
                View Your Realtime Collection Stats
              </h3>
              <p className="text-lg mt-2 text-[#7E838B] leading-tight tracking-tighter">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reprehenderit, beatae accusamus
              </p>
              <div className="relative h-[300px] rounded-lg overflow-hidden mt-16 bg-[#141516]"></div>
            </div>
            <div className="md:border-l pt-20 pb-28 md:pl-14">
              <h3 className="text-xl font-medium leading-tight tracking-tighter">
                View Your Realtime Collection Stats
              </h3>
              <p className="text-lg mt-2 text-[#7E838B] leading-tight tracking-tighter">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reprehenderit, beatae accusamus
              </p>
              <div className="relative h-[300px] rounded-lg overflow-hidden mt-16 bg-[#141516]"></div>
            </div>
          </div>
          <div className="mt-10 border-b pb-4">
            <h2 className="text-xl font-medium leading-tight tracking-tighter">
              This Insights
            </h2>
            <p className="text-lg mt-2 text-[#7E838B] leading-tight tracking-tighter">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              sed repellat perferendis sunt quam ducimus ex distinctio. Repellat
              mollitia
            </p>
            <div className="w-full h-96 relative rounded-xl mt-10">
              {/* Bottom fade */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#141516] to-transparent" />
            </div>
          </div>

          <div className="flex w-full mt-10 gap-2">
            <div className="w-1/4  h-40">
              <h2 className=" font-medium leading-tight tracking-tighter">
                This Insights
              </h2>
              <p className=" mt-2 text-[#7E838B] leading-tight tracking-tighter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis,
              </p>
            </div>
            <div className="w-1/4  h-40">
              <h2 className=" font-medium leading-tight tracking-tighter">
                This Insights
              </h2>
              <p className=" mt-2 text-[#7E838B] leading-tight tracking-tighter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis,
              </p>
            </div>
            <div className="w-1/4  h-40">
              <h2 className=" font-medium leading-tight tracking-tighter">
                This Insights
              </h2>
              <p className=" mt-2 text-[#7E838B] leading-tight tracking-tighter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis,
              </p>
            </div>
            <div className="w-1/4  h-40">
              <h2 className=" font-medium leading-tight tracking-tighter">
                This Insights
              </h2>
              <p className=" mt-2 text-[#7E838B] leading-tight tracking-tighter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis,
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className=" mt-24 bg-gradient-to-b from-[#141516] via-[#08090A] to-[#08090A]">
      <div className="landingContainer">
        <div className="pt-24">
          <div>
            <h2 className="text-5xl font-semibold">How it Works</h2>
            <div className="rounded-xl h-96 bg-[#141516] mt-20"></div>
            {/* Curly Loop Arrow */}
            <svg
              className="w-16 h-40 text-purple-400 m-auto"
              viewBox="0 0 50 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Straight line down from top */}
              <path
                d="M25 0 L25 60 
       C25 90, -10 90, 25 120
       C60 150, 25 150, 25 180
       L25 180"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Arrowhead */}
              <polyline
                points="20,175 25,185 30,175"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="rounded-xl h-96 bg-[#141516]"></div>
            {/* Curly Loop Arrow */}
            <svg
              className="w-16 h-40 text-purple-400 m-auto"
              viewBox="0 0 50 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Straight line down from top */}
              <path
                d="M25 0 L25 60 
       C25 90, -10 90, 25 120
       C60 150, 25 150, 25 180
       L25 180"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Arrowhead */}
              <polyline
                points="20,175 25,185 30,175"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="rounded-xl h-96 bg-[#141516] "></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="mt-44 bg-gradient-to-b from-[#141516] via-[#08090A] to-[#08090A]">
      <div className="landingContainer">
        <div className="pt-24">
          <div>
            <h3 className="text-lg font-medium">What Users are Saying...</h3>
            <p className="mt-8 text-3xl font-medium">
              Shelfu helped me organize my manga collection in minutes. Love the
              UI!
            </p>
            <div className="flex gap-5 mt-10">
              <div className="h-10 w-10 rounded-full bg-blue-700"></div>
              <div>
                <p>Name Guys</p>
                <p>Beta User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ByeCTA = () => {
  return <section className="mt-16"></section>;
};
const CtaBtn = ({ children, to }) => {
  return (
    <a href={to} className="mt-2 w-max">
      <span
        className="relative z-0 py-2 px-5 flex rounded-lg
      bg-[radial-gradient(ellipse_at_top_left,#5516E8FF,#8C51F1FF)]
      text-white overflow-hidden shadow-[6px_6px_10px_rgba(0,0,0,0.3)] group"
      >
        {/* Button Text */}
        <span className="relative z-10 ">{children}</span>

        {/* Shadow Overlay */}
        <span
          className="absolute inset-0 z-0 rounded-md
        bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.3),transparent)]
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></span>
      </span>
    </a>
  );
};
