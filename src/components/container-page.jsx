"use client";
import { twMerge } from "tailwind-merge";

import { useSidebar } from "@/lib/hooks/useSidebar";

export const ContainerPage = ({ children }) => {
  const { isOpen } = useSidebar();
  return (
    <div
      className={twMerge(
        "ml-0 grow p-2 pt-4 lg:ml-[256px] lg:pl-4 lg:pr-[35px]",
        isOpen
          ? "ml-0 transition-all duration-300 lg:ml-[256px]"
          : "!ml-0 transition-all duration-300",
      )}
    >
      {children}
    </div>
  );
};
