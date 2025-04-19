"use client";

import { useRouter } from "next/navigation";
import HomePage from "./home";
import Footer from "@/components/footer";
import LandingPageFooter from "@/components/LandingPageFooter";
import LandingHeadBar from "@/components/LandingPageHeader";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <LandingHeadBar />
      <HomePage />
      <LandingPageFooter />
    </div>
  );
}
