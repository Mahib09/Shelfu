import React from "react";
import Image from "next/image";

import { useTheme } from "next-themes";
import { LinkedinOriginal } from "devicons-react";
import { Github, Instagram, LinkedinIcon } from "lucide-react";
const LandingPageFooter = () => {
  const firstRowData = [
    { title: "Contact Us", path: "/contactus" },
    { title: "Help", path: "/help" },
  ];

  const secondRowData = [
    { title: "Terms of Service", path: "/terms" },
    { title: "Privacy Policy", path: "/privacy" },
    { title: "Data Processing Agreement", path: "/data" },
  ];

  const thirdRowData = [
    { title: "Sign Up", path: "/auth/signup" },
    { title: "Log In", path: "/auth/login" },
  ];

  const socials = [
    { title: "LinkedIn", icon: LinkedinIcon, path: "/" },
    { title: "Instagram", icon: Instagram, path: "/" },
    { title: "Github", icon: Github, path: "/" },
  ];
  const { theme } = useTheme();
  return (
    <footer className="border-t">
      <div className="px-5 md:px-8 lg:px-20 max-w-7xl m-auto">
        <div className="flex flex-col justify-start lg:flex-row lg:justify-between">
          <a href="/" className="flex items-center">
            <h2 className={`text-xl font-bold`}>Shelfu</h2>
          </a>

          <nav className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[repeat(3,fit-content(240px))] md:gap-36 lg:gap-[58px] xl:gap-[66px]">
            <div className="flex flex-col gap-2">
              <p className="font-medium tracking-tight">Support</p>
              <ul className="flex flex-col gap-1">
                {firstRowData.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.path}
                      className="gap-x-1.5 rounded tracking-tight text-muted-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium tracking-tight">Get Started</p>
              <ul className="flex flex-col gap-1">
                {thirdRowData.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.path}
                      className="gap-x-1.5 rounded tracking-tight text-muted-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium tracking-tight">Legal</p>
              <ul className="flex flex-col gap-1">
                {secondRowData.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.path}
                      className="gap-x-1.5 rounded tracking-tight text-muted-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div className="border-t mt-5 py-5 flex flex-col-reverse md:flex-row gap-2">
          <p className=" tracking-tight text-sm md:text-base text-muted-foreground">
            © 2025 Shelfu, Toronto, ON
          </p>
          <div className="flex md:ml-auto gap-4">
            {socials.map((item) => (
              <a
                key={item.title}
                path={item.path}
                className="transition-colors duration-200 hover:text-accent cursor-pointer"
              >
                {<item.icon size={18} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
