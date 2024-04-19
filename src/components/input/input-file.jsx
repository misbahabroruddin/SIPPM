"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const InputFile = ({
  watch,
  register,
  name,
  errors,
  resetField,
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
    <label
      htmlFor={name}
      className={twMerge(
        "relative flex cursor-pointer items-center justify-center rounded-lg border border-gray-100 p-6 text-sm lg:text-base",
        errors && "border-red-500",
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Image
          src={"/icons/upload-file.svg"}
          width={40}
          height={40}
          alt="file"
          className="h-7 w-7 lg:h-10 lg:w-10"
        />
        <label htmlFor={name} className="cursor-pointer text-center">
          {preview ? preview : "Select File"}
          {errors && (
            <p className="mt-2 text-center text-red-500">{errors.message}</p>
          )}
        </label>
      </div>
      <input
        type="file"
        name={name}
        id={name}
        className="hidden"
        {...register}
        accept={accept}
      />
      {preview && (
        <button
          className="absolute right-3 top-2"
          type="button"
          onClick={() => resetField(name)}
          title="Clear File"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.375 17C13.1562 17 13 16.8438 13 16.625V9.875C13 9.6875 13.1562 9.5 13.375 9.5H14.125C14.3125 9.5 14.5 9.6875 14.5 9.875V16.625C14.5 16.8438 14.3125 17 14.125 17H13.375ZM18.5 6.5C18.75 6.5 19 6.75 19 7V7.5C19 7.78125 18.75 8 18.5 8H18V18.5C18 19.3438 17.3125 20 16.5 20H7.5C6.65625 20 6 19.3438 6 18.5V8H5.5C5.21875 8 5 7.78125 5 7.5V7C5 6.75 5.21875 6.5 5.5 6.5H8.0625L9.125 4.75C9.375 4.3125 9.875 4 10.4062 4H13.5625C14.0938 4 14.5938 4.3125 14.8438 4.75L15.9062 6.5H18.5ZM10.3438 5.59375L9.8125 6.5H14.1562L13.625 5.59375C13.5938 5.5625 13.5312 5.5 13.4688 5.5H10.5312C10.5 5.5 10.5 5.5 10.5 5.5C10.4375 5.5 10.375 5.5625 10.3438 5.59375ZM16.5 18.5V8H7.5V18.5H16.5ZM9.875 17C9.65625 17 9.5 16.8438 9.5 16.625V9.875C9.5 9.6875 9.65625 9.5 9.875 9.5H10.625C10.8125 9.5 11 9.6875 11 9.875V16.625C11 16.8438 10.8125 17 10.625 17H9.875Z"
              fill="#FF3333"
            />
          </svg>
        </button>
      )}
    </label>
  );
};
