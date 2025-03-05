"use client";
import { Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { useTheme } from "next-themes";

const HeadBar = ({ src }) => {
  const { open, isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className="flex gap-2 p-2 items-center">
      {open && !isMobile ? <></> : <SidebarTrigger />}

      <Button
        variant="ghost"
        size="icon"
        className="ml-auto rounded-full"
        onClick={toggleTheme}
      >
        {theme === "light" ? <Moon /> : <Sun />}{" "}
      </Button>
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default HeadBar;
