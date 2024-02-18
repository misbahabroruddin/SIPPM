"use client";

import { twMerge } from "tailwind-merge";

export const ButtonDelete = ({ className, iconLeft, ...props }) => {
  return (
    <button
      className={twMerge(
        "w-24 py-2 bg-red-06 rounded-lg text-white disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      Hapus
    </button>
  );
};
