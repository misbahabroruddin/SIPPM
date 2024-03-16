"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const ButtonDownload = ({ onClick, className, ...props }) => {
  return (
    <button
      className={twMerge(
        "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.25 11.9062C13.25 11.6875 13.0625 11.5312 12.875 11.5312H12.125C11.9062 11.5312 11.75 11.6875 11.75 11.9062V14.5312H10.2188C9.875 14.5312 9.71875 14.9375 9.9375 15.1562L12.1875 17.4062C12.3438 17.5625 12.625 17.5625 12.7812 17.4062L15.0312 15.1562C15.25 14.9375 15.0938 14.5312 14.75 14.5312H13.25V11.9062ZM18.0312 7.5625L15.4062 4.96875C15.125 4.6875 14.75 4.5 14.375 4.5H7.96875C7.15625 4.53125 6.5 5.1875 6.5 6.03125V19.0312C6.5 19.8438 7.15625 20.5 7.96875 20.5H16.9688C17.8125 20.5 18.5 19.8438 18.5 19.0312V8.625C18.5 8.25 18.3125 7.84375 18.0312 7.5625ZM14.4688 6.125L16.875 8.53125H14.4688V6.125ZM17 19.0312H7.96875V6.03125H12.9688V9.28125C12.9688 9.6875 13.3125 10.0312 13.7188 10.0312H17V19.0312Z"
          fill="white"
        />
      </svg>
      <p className="hidden lg:block">Download</p>
    </button>
  );
};
