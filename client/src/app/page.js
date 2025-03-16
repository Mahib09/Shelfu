"use client";

import { useRouter } from "next/navigation";
import HomePage from "./home";
import Footer from "@/components/footer";
import LandingPageFooter from "@/components/LandingPageFooter";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <HomePage />
      <LandingPageFooter />
    </div>
  );
}
