import React from "react";
import Image from "next/image";

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

  const product = [
    { title: "Home", path: "/" },
    { title: "Features", path: "/" },
    { title: "Pricing", path: "/pricing" },
    { title: "Updates ", path: "/updates" },
    { title: "Readme ", path: "/readme" },
  ];

  const support = [
    { title: "Contact Us ", path: "/contactus" },
    { title: "FAQ ", path: "/faq" },
    { title: "Feedback ", path: "/feedback" },
  ];

  const account = [
    { title: "Sign Up ", path: "/auth/signup" },
    { title: "Log In ", path: "/auth/login" },
    { title: "Profile ", path: "/user" },
    { title: "Dashboard ", path: "/dashboard" },
  ];

  const legal = [
    { title: "Terms ", path: "/terms" },
    { title: "Privacy ", path: "/privacy" },
    { title: "DPA ", path: "/dpa" },
    { title: "Cookie Policy ", path: "/cookie" },
  ];

  return (
    <footer className="pt-10 pb-44 md:pb-20 text-white border-t border-[#262626] text-sm">
      <div className="landingContainer">
        <nav className="mt-8 w-full items-start grid grid-cols-3 gap-x-6 gap-y-8 md:grid-cols-5 ">
          <a href="/" className="flex items-center">
            <Image
              src="/brandassets/logo-light.png"
              width={30}
              height={100}
              alt="logo"
            />
          </a>
          <div className="flex flex-col gap-6">
            <p className="font-medium tracking-tight">Product</p>
            <ul className="flex flex-col gap-1">
              {product.map((item) => (
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
          <div className="flex flex-col gap-6">
            <p className="font-medium tracking-tight">Support</p>
            <ul className="flex flex-col gap-1">
              {support.map((item) => (
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
          <div className="flex flex-col gap-6">
            <p className="font-medium tracking-tight">Account</p>
            <ul className="flex flex-col gap-1">
              {account.map((item) => (
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
          <div className="flex flex-col gap-6">
            <p className="font-medium tracking-tight">Legal</p>
            <ul className="flex flex-col gap-1">
              {legal.map((item) => (
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
    </footer>
  );
};

export default LandingPageFooter;
