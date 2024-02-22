"use client";
import { twMerge } from "tailwind-merge";

import { BasePageTitle } from "@/components/base-page-title";
import { useSidebar } from "@/lib/hooks/useSidebar";

export default function HomePage() {
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
      <BasePageTitle />
    </div>
  );
}
