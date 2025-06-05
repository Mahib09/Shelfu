"use client";

import { useRouter } from "next/navigation";
import HomePage from "./home";
import Footer from "@/components/footer";
import LandingPageFooter from "@/components/LandingPageFooter";
import LandingHeadBar from "@/components/LandingPageHeader";
import { useEffect, useState } from "react";
import DevelopingPage from "@/components/home/Developing";

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    // Check if authorized in localStorage
    const auth = localStorage.getItem("shelfuAuthorized");
    if (auth === "true") {
      setAuthorized(true);
    }
    setCheckedAuth(true);
  }, []);

  if (!checkedAuth) return null; // or spinner

  if (!authorized) {
    // Show password input page first
    return <DevelopingPage onPasswordCorrect={() => setAuthorized(true)} />;
  }
  return (
    <div className="" suppressHydrationWarning={true}>
      <LandingHeadBar />
      <HomePage />
      <LandingPageFooter />
    </div>
  );
}
