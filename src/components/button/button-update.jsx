"use client";

import { twMerge } from "tailwind-merge";

export const ButtonUpdate = ({ className, iconLeft, ...props }) => {
  return (
    <button
      className={twMerge("w-24 py-2 bg-green rounded-lg text-white", className)}
      {...props}
    >
      Update
    </button>
  );
};
