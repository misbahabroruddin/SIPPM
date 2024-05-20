"use client";

import { Spinner } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

export const ButtonUploadPenilaian = ({
  onClick,
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "flex items-center gap-2 rounded bg-green px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500",
      )}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <Spinner className="h-4 w-4" />
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0312 7.5625C18.3125 7.84375 18.5 8.25 18.5 8.625V19.0312C18.5 19.8438 17.8125 20.5 16.9688 20.5H7.96875C7.15625 20.5 6.5 19.8438 6.5 19.0312V6.03125C6.5 5.1875 7.15625 4.53125 7.96875 4.5H14.375C14.75 4.5 15.125 4.6875 15.4062 4.96875L18.0312 7.5625ZM14.4688 6.125V8.53125H16.875L14.4688 6.125ZM17 19.0312V10.0312H13.7188C13.3125 10.0312 12.9688 9.6875 12.9688 9.28125V6.03125H7.96875V19.0312H17ZM12.1875 11.625C12.3438 11.4688 12.625 11.4688 12.7812 11.625L15.0312 13.875C15.25 14.125 15.0938 14.5312 14.75 14.5312H13.25V17.1562C13.25 17.3438 13.0625 17.5312 12.875 17.5312H12.125C11.9062 17.5312 11.75 17.3438 11.75 17.1562V14.5312H10.2188C9.875 14.5312 9.71875 14.125 9.9375 13.875L12.1875 11.625Z"
            fill="white"
          />
        </svg>
      )}
      <p className="text-sm md:text-base">Upload</p>
    </button>
  );
};
