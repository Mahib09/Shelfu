"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { useContext, createContext, useState, useEffect } from "react";

const uiContext = createContext();

export const UiProvider = ({ children }) => {
  const { open } = useSidebar();
  const [pagewidth, setPageWidth] = useState("100%");
  const sidebarWidth = "18rem"; // or dynamically set this value based on some condition

  useEffect(() => {
    if (open) {
      setPageWidth(`calc(90vw - ${sidebarWidth})`);
    } else {
      setPageWidth("90vw");
    }
    console.log(open);
    console.log("Page Width: ", pagewidth);
  }, [open]);
  return (
    <uiContext.Provider value={{ pagewidth }}>{children}</uiContext.Provider>
  );
};

export const useUi = () => {
  return useContext(uiContext);
};
