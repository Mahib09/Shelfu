"use client";
import { Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { useAuth } from "@/context/authContext";
import { useManga } from "@/context/mangaContext";

const HeadBar = () => {
  const { open, isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { logout, loading, userName, userEmail } = useAuth();
  const { setCollection } = useManga();
  const router = useRouter();

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    setCollection([]);
    logout();
  };
  return (
    <header className="border border-dashed border-x-0 border-t-0 w-full">
      <div className="md:mx-12 xl:mx-20 mx-0 border border-dashed border-y-0">
        <div className="flex gap-2 px-4 py-2 items-center ">
          {open && !isMobile ? <></> : <SidebarTrigger />}

          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-full"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon /> : <Sun />}{" "}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/user");
                  }}
                >
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/user/settings");
                  }}
                >
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} disabled={loading}>
                {loading ? "Logging Out..." : "Log out"}
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default HeadBar;
