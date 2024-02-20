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
        "flex gap-2 items-center px-4 py-2 bg-[#23B900] rounded text-white disabled:bg-gray-500 disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <Image
        src='/icons/plus-circle-white.svg'
        width={24}
        height={24}
        alt='tab'
      />
      <p className='hidden lg:block'>{text}</p>
    </button>
  );
};
