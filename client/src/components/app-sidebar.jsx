"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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
import { User2, ChevronUp } from "lucide-react";
import { useAuth } from "@/context/authContext";

const AppSidebar = () => {
  const { logout, loading } = useAuth();
  const SidebarData = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Collection", path: "/collection" },
    { title: "Search", path: "/search" },
    { title: "Recommendation", path: "/recommendation" },
    { title: "Back To Home", path: "/" },
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
          <SidebarMenu>
            {SidebarData.map((data) => (
              <SidebarMenuItem key={data.title} className="py-1">
                <SidebarMenuButton asChild>
                  <a href={data.path}>
                    <span className="text-md font-medium text-gray-600">
                      {data.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
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
