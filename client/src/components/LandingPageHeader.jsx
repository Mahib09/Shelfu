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
    <header className="border border-dashed border-x-0  border-t-0 w-full">
      <div className="md:mx-12 lg:mx-20 xl:mx-48 mx-0 border border-dashed border-y-0">
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
