"use client";
import { twMerge } from "tailwind-merge";

import { useSidebar } from "@/lib/hooks/useSidebar";

export const ContainerPage = ({ children }) => {
  const { isOpen } = useSidebar();
  return (
    <div
      className={twMerge(
        "pt-4 pr-[35px] pl-4 grow ml-0 lg:ml-[256px]",
        isOpen
          ? "ml-0 lg:ml-[256px] transition-all duration-300"
          : "!ml-0 transition-all duration-300"
      )}
    >
      {children}
    </div>
  );
};
