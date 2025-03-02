"use client";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { Send, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      Landing Page
      <a href="/auth/login" className="text-blue-500 font-light">
        Login
      </a>
    </div>
  );
}
