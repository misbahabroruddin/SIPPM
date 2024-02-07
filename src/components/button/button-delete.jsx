"use client";

import { twMerge } from "tailwind-merge";

export const ButtonDelete = ({ className, iconLeft, ...props }) => {
  return (
    <button
      className={twMerge(
        "w-24 py-2 bg-red-06 rounded-lg text-white",
        className
      )}
      {...props}
    >
      Hapus
    </button>
  );
};
