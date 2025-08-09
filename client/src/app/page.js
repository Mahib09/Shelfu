"use client";

import { useRouter } from "next/navigation";
import HomePage from "./home";
import Footer from "@/components/footer";
import LandingPageFooter from "@/components/LandingPageFooter";
import LandingHeadBar from "@/components/LandingPageHeader";
import { useEffect, useState } from "react";
import DevelopingPage from "@/components/home/Developing";
import OneScreenHero from "@/components/home/OneScreenHero";

export default function Home() {
  return (
    <div className="" suppressHydrationWarning={true}>
      <OneScreenHero />
      <LandingPageFooter />
    </div>
  );
}
