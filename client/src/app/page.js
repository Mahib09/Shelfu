"use client";
import Image from "next/image";
import Logo from "../../public/Logo.png";
import { Send, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="m-3 px-8 py-2">
      <header className="flex gap-5">
        <div className="flex items-center cursor-pointer">
          <Image src={Logo} height={50} width={50} alt="Logo" />
          {/* <h2 className={`text-xl font-bold `}>Shelfu</h2> */}
        </div>
        <div className="ml-auto">
          <Sun />
        </div>
        <a href="/auth/signup" className="">
          SignUp/SignIn
        </a>
      </header>
      <main className="h-screen w-full flex gap-5 flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Organize Your Manga Collection
          </h1>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Like Never Before
          </h1>
          <p className="mt-6 pl-6 italic">
            “Easily track your collection, add notes and build your dream
            collection”
          </p>
        </div>
        <button
          className="flex bg-[#B7F4EA] p-3 rounded-lg text-[#1B8D65] gap-2 items-center justify-center"
          onClick={() => {
            router.push("/auth/signup");
          }}
        >
          Get Started <Send />
        </button>
      </main>
    </div>
  );
}
