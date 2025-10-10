"use client";

import LandingPage from "@/components/home/LandingPage";
import LandingPageFooter from "@/components/home/LandingPageFooter";
import LandingHeadBar from "@/components/home/LandingPageHeader";

export default function Home() {
  return (
    <div className="bg-[#08090A]" suppressHydrationWarning={true}>
      <LandingHeadBar />
      <LandingPage />
      <LandingPageFooter />
    </div>
  );
}
