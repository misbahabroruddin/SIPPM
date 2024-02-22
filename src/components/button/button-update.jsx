"use client";

import { twMerge } from "tailwind-merge";

export const ButtonUpdate = ({
  className,
  iconLeft,
  text = "Update",
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "w-24 py-2 bg-green rounded-lg text-white disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {iconLeft && (
        <svg
          width='25'
          height='24'
          viewBox='0 0 25 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18.0312 7.0625L15.4062 4.46875C15.125 4.1875 14.75 4 14.375 4H7.96875C7.15625 4.03125 6.5 4.6875 6.5 5.53125V18.5312C6.5 19.3438 7.15625 20 7.96875 20H16.9688C17.8125 20 18.5 19.3438 18.5 18.5312V8.125C18.5 7.75 18.3125 7.34375 18.0312 7.0625ZM14.4688 5.625L16.875 8.03125H14.4688V5.625ZM17 18.5312H7.96875V5.53125H12.9688V8.78125C12.9688 9.1875 13.3125 9.53125 13.7188 9.53125H17V18.5312ZM12.1875 11.125L9.9375 13.375C9.71875 13.625 9.875 14.0312 10.2188 14.0312H11.75V16.6562C11.75 16.8438 11.9062 17.0312 12.125 17.0312H12.875C13.0625 17.0312 13.25 16.8438 13.25 16.6562V14.0312H14.75C15.0938 14.0312 15.25 13.625 15.0312 13.375L12.7812 11.125C12.625 10.9688 12.3438 10.9688 12.1875 11.125Z'
            fill='white'
          />
        </svg>
      )}
      <p>{text}</p>
    </button>
  );
};
