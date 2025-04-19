import React from "react";
import Image from "next/image";
import logoWhite from "../../public/logo-white.png";
import logoBlack from "../../public/logo-black.png";
import { useTheme } from "next-themes";
const LandingPageFooter = () => {
  const firstRowData = [
    { title: "Contact Us", path: "/contactus" },
    { title: "Help", path: "/help" },
  ];

  const secondRowData = [
    { title: "Sign Up", path: "/auth/signup" },
    { title: "Log In", path: "/auth/login" },
    { title: "Terms of Service", path: "/terms" },
    { title: "Privacy Policy", path: "/privacy" },
  ];
  const { theme } = useTheme();
  return (
    <footer className="border-t">
      <div className="px-20">
        <div className="flex gap-3 py-10 text-sm font-medium items-start justify-center ">
          <div>
            <a href="/" className="flex items-center">
              <Image
                src={theme === "light" ? logoBlack : logoWhite}
                height={40}
                width={40}
                alt="Logo"
                className="transition-opacity delay-100 ease-in-out"
              />
              <h2 className={`text-xl font-bold`}>Shelfu</h2>
            </a>
            <p className="text-xs text-muted-foreground">
              © 2025 Shelfu, Toronto, ON
            </p>
          </div>
          <div className="flex flex-col sm:flex-row ml-auto gap-2 sm:gap-20">
            <div className="">
              <ul className="flex flex-col gap-4">
                {firstRowData.map((item) => (
                  <li
                    key={item.title}
                    className="hover:underline cursor-pointer"
                  >
                    <a href={item.path}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                {secondRowData.map((item) => (
                  <li
                    key={item.title}
                    className="hover:underline cursor-pointer"
                  >
                    <a href={item.path}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
