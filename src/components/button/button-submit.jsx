"use client";

import { twMerge } from "tailwind-merge";

export const ButtonSubmit = ({
  onClick,
  text = "Submit",
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "flex justify-center gap-1 bg-primary py-2 rounded-lg text-white disabled:bg-black-07 disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <svg
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.0312 7.0625C18.3125 7.34375 18.5 7.71875 18.5 8.125V18.5C18.5 19.3438 17.8125 20 17 20H8C7.15625 20 6.5 19.3438 6.5 18.5V5.5C6.5 4.6875 7.15625 4 8 4H14.375C14.7812 4 15.1562 4.1875 15.4375 4.46875L18.0312 7.0625ZM16.875 8L14.5 5.625V8H16.875ZM8 18.5H17V9.5H13.75C13.3125 9.5 13 9.1875 13 8.75V5.5H8V18.5ZM16.1562 12.5L11.6875 16.9062C11.5625 17.0625 11.3125 17.0625 11.1562 16.9062L8.8125 14.5312C8.6875 14.4062 8.6875 14.1562 8.8125 14L9.53125 13.3125C9.6875 13.1562 9.90625 13.1562 10.0625 13.3125L11.4375 14.6875L14.9062 11.25C15.0625 11.0938 15.3125 11.0938 15.4375 11.25L16.1562 11.9688C16.2812 12.125 16.2812 12.3438 16.1562 12.5Z'
          fill='white'
        />
      </svg>
      <p>{text}</p>
    </button>
  );
};
