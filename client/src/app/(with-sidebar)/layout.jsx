import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Sun, User, UserCircle } from "lucide-react";

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <main className="flex-1 ">
          <div className="flex p-2 gap-5 items-center">
            <SidebarTrigger />
            <div className="ml-auto">
              <Sun />
            </div>
            <div>
              <UserCircle size={35} />
            </div>
          </div>

          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
