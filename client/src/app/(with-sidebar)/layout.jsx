import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { UiProvider } from "@/context/uiContext";
import HeadBar from "@/components/header";

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <UiProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 ">
            <HeadBar />
            {children}
          </main>
        </div>
      </UiProvider>
    </SidebarProvider>
  );
}
