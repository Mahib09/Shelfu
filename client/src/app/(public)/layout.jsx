import LandingPageFooter from "@/components/home/LandingPageFooter";
import LandingHeadBar from "@/components/home/LandingPageHeader";
import { AuthProvider } from "@/context/authContext";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d0d] text-gray-200">
      <LandingHeadBar />
      <main className="flex-grow">{children}</main>
      <LandingPageFooter />
    </div>
  );
}
