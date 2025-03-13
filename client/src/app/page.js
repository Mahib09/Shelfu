"use client";

import { useRouter } from "next/navigation";
import HomePage from "./home";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <HomePage />
    </div>
  );
}
