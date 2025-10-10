import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

const LandingHeadBar = () => {
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const logoSrc = "/brandassets/wordmark-light.png";
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const dashOrStart = isLoggedIn ? "/dashboard" : "/auth/signup";

  return (
    <header className="sticky top-0 z-50 h-[65px] border-b bg-[#080909]/90 backdrop-blur-md ">
      <div className="relative max-w-7xl px-8 md:px-12 flex items-center justify-between h-full w-full m-auto">
        {/* Logo */}
        <a href="/" className="flex items-center font-extrabold text-lg">
          <Image src={logoSrc} height={100} width={90} alt="logo" />
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          <a
            href="/"
            className="text-[#848992] rounded-lg px-3 py-1.5 font-medium text-sm  hover:bg-muted hover:text-white transition-all"
          >
            Product
          </a>
          <a
            href="/"
            className="text-[#848992] rounded-lg px-3 py-1.5 font-medium text-sm  hover:bg-muted hover:text-white transition-all"
          >
            Pricing
          </a>
          <a
            href="/"
            className="text-[#848992] rounded-lg px-3 py-1.5 font-medium text-sm  hover:bg-muted hover:text-white transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(dashOrStart)}
            className="text-[#848992] rounded-lg px-3 py-1.5 font-medium text-sm  hover:bg-muted hover:text-white transition-all"
          >
            {isLoggedIn ? "Docs" : "Log in"}
          </button>
          <button
            onClick={() => router.push(dashOrStart)}
            className="bg-[#E6E6E6] text-black rounded-lg px-3 py-1.5 font-medium text-sm shadow hover:bg-white transition-colors delay-75"
          >
            {isLoggedIn ? "Open App" : "Sign up"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeadBar;
