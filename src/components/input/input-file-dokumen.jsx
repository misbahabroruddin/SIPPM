"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const InputFileDokumen = ({
  watch,
  register,
  name,
  errors,
  label,
  accept = "application/pdf",
}) => {
  const [preview, setPreview] = useState();
  useEffect(() => {
    const file = watch(name);
    if (file) {
      setPreview(file[0]?.name);
    } else {
      setPreview(null);
    }
  }, [watch(name)]);
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
      <label
        htmlFor={name}
        className="flex grow cursor-pointer rounded border border-gray-200 p-2 text-center "
      >
        {preview ? preview : "Pilih File"}
        {errors && <p className="mt-2 text-red-500">{errors.message}</p>}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className="hidden"
        {...register}
        accept={accept}
      />
    </div>
  );
};
