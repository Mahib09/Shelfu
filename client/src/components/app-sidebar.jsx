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
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Image from "next/image";
import Logo from "../../public/Logo.png";
import { usePathname } from "next/navigation";
import {
  User2,
  ChevronUp,
  LayoutDashboard,
  LibraryBig,
  Search,
  HandHeart,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/authContext";

const AppSidebar = () => {
  const { logout, loading } = useAuth();
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
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center cursor-pointer">
          <Image src={Logo} height={40} width={40} alt="Logo" />
          <h2 className={`text-xl font-bold`}>Shelfu</h2>
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <button disabled={loading}>
                    {loading ? "Logging Out..." : "Sign Out"}
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
