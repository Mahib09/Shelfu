import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Sun, User, UserCircle } from "lucide-react";
import { UiProvider } from "@/context/uiContext";

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <UiProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 ">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </UiProvider>
    </SidebarProvider>
  );
}
