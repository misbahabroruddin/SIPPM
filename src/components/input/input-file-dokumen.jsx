"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const InputFileDokumen = ({
  register,
  name,
  errors,
  label,
  accept = "application/pdf",
}) => {
  return (
    <div className="flex flex-col items-start gap-2 overflow-hidden lg:flex-row lg:items-center">
      <label
        htmlFor={name}
        className={twMerge(
          "flex w-full cursor-pointer text-start lg:w-2/5",
          errors && "border-red-500",
        )}
      >
        {label}
      </label>
      <input type="file" name={name} id={name} {...register} accept={accept} />
    </div>
  );
};
