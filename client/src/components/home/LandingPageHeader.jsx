"use client";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

const LandingHeadBar = () => {
  const { isLoggedIn } = useAuth();
  const logoSrc = "/brandassets/wordmark-light.png";
  const dashOrStart = isLoggedIn ? "/dashboard" : "/auth/signup";

  return (
    <header className="sticky top-0 z-50 h-[65px] border-b border-[#262626] bg-[#080909]/90 backdrop-blur-md ">
      <div className="relative max-w-7xl px-8 md:px-12 flex items-center justify-between h-full w-full m-auto">
        {/* Logo */}
        <a href="/" className="flex items-center font-extrabold text-lg">
          <Image src={logoSrc} height={100} width={90} alt="logo" />
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          <a
            href="/#features"
            className="text-[#848992] h-auto rounded-lg px-3 py-1.5 font-medium text-sm  hover:bg-[#262626] hover:text-white transition-all"
          >
            Product
          </a>
          <a
            href="/pricing"
            className="text-[#848992]  h-auto  rounded-lg px-3 py-1.5 font-medium text-sm  hover:bg-[#262626] hover:text-white transition-all"
          >
            Pricing
          </a>
          <a
            href="/contactus"
            className="text-[#848992]  h-auto rounded-lg px-3 py-1.5 font-medium text-sm  hover:bg-[#262626] hover:text-white transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Auth buttons */}
        <div className="flex  gap-3">
          <a
            href={`${dashOrStart}`}
            className="text-[#848992] cursor-pointer rounded-lg px-3  h-auto py-1.5 font-medium text-sm  hover:bg-[#262626] hover:text-white transition-all"
          >
            {isLoggedIn ? "Docs" : "Log in"}
          </a>
          <a
            href={`${dashOrStart}`}
            className="bg-[#E6E6E6] cursor-pointer text-black  h-auto rounded-lg px-3 py-1.5 font-medium text-sm shadow hover:bg-white transition-colors delay-75"
          >
            {isLoggedIn ? "Open App" : "Sign up"}
          </a>
        </div>
      </div>
    </header>
  );
};

export default LandingHeadBar;
