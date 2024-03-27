"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const ButtonAdd = ({
  onClick,
  text = "Pengajuan",
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "flex items-center gap-2 rounded bg-[#23B900] px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <Image
        src="/icons/plus-circle-white.svg"
        width={24}
        height={24}
        alt="tab"
      />
      <p className="block">{text}</p>
    </button>
  );
};
