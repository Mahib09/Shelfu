import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

const LandingHeadBar = () => {
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const logoSrc = theme === "dark" ? "/logo-white.png" : "/logo-black.png";
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const dashOrStart = isLoggedIn ? "/dashboard" : "/auth/signup";

  return (
    <header className=" border-b z-10">
      <div className="md:px-20">
        <div className="flex gap-2 px-4 py-2 items-center">
          <a href="/" className="flex items-center font-extrabold text-lg">
            <Image src={logoSrc} height={40} width={40} alt={"logo"} />
            Shelfu
          </a>
          <a href={dashOrStart}></a>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-full"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
          <Button onClick={() => router.push(dashOrStart)}>
            {isLoggedIn ? "Dashboard" : "Get Started"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeadBar;
