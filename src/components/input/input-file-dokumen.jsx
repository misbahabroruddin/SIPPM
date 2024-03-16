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
    <div className="flex items-center">
      <label
        htmlFor={name}
        className={twMerge(
          "flex w-2/5 cursor-pointer text-start",
          errors && "border-red-500",
        )}
      >
        {label}
      </label>
      <input type="file" name={name} id={name} {...register} accept={accept} />
    </div>
  );
};
