"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Image from "next/image";
import logoWhite from "../../public/logo-white.png";
import logoBlack from "../../public/logo-black.png";
import { usePathname } from "next/navigation";
import {
  User2,
  ChevronUp,
  LayoutDashboard,
  LibraryBig,
  Search,
  HandHeart,
  Home,
  LogOut,
  SquareUser,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useTheme } from "next-themes";

const AppSidebar = () => {
  const { logout, loading, userName } = useAuth();
  const pathname = usePathname();
  const SidebarData = [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Collection", path: "/collection", icon: LibraryBig },
    { title: "Search", path: "/search", icon: Search },
    { title: "Recommendation", path: "/recommendation", icon: HandHeart },
    { title: "Back To Home", path: "/", icon: Home },
  ];

  const handleSignOut = (e) => {
    e.preventDefault();
    logout();
  };
  const { theme } = useTheme();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center cursor-pointer">
          <a href="/" className="flex items-center">
            <Image
              src={
                theme === "light"
                  ? "/brandassets/wordmark-dark.svg"
                  : "/brandassets/wordmark-light.svg"
              }
              height={50}
              width={100}
              alt="Logo"
              className="transition-opacity delay-100 ease-in-out"
            />
          </a>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarData.map((data) => (
                <SidebarMenuItem key={data.title} className="py-1">
                  <SidebarMenuButton asChild>
                    <a
                      href={data.path}
                      className={
                        (" transition-all",
                        pathname === data.path ? "bg-sidebar-accent" : "")
                      }
                    >
                      <data.icon />
                      <span>{data.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <hr></hr>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {userName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <a href="/user/settings" className="w-full">
                    Settings
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <button disabled={loading} className="flex gap-2">
                    <span>{loading ? "Logging Out..." : "Log out"}</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
