import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { UiProvider } from "@/context/uiContext";
import HeadBar from "@/components/header";
import Footer from "@/components/footer";

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <UiProvider>
        <div className="flex w-full min-h-screen ">
          <AppSidebar />
          <div className="flex flex-col flex-1 ">
            <HeadBar />
            <main className="">{children}</main>
            <Footer />
          </div>
        </div>
      </UiProvider>
    </SidebarProvider>
  );
}
