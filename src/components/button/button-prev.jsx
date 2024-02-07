"use client";

import { twMerge } from "tailwind-merge";

export const ButtonPrev = ({ className, ...props }) => {
  return (
    <button
      className={twMerge(
        "flex justify-center items-center gap-1 p-2 w-[200px] bg-[#DAEDFF] rounded text-black",
        className
      )}
      type='button'
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
          d='M4.75 12C4.75 7.71875 8.21875 4.25 12.5 4.25C16.7812 4.25 20.25 7.71875 20.25 12C20.25 16.2812 16.7812 19.75 12.5 19.75C8.21875 19.75 4.75 16.2812 4.75 12ZM18.75 12C18.75 8.5625 15.9375 5.75 12.5 5.75C9.03125 5.75 6.25 8.5625 6.25 12C6.25 15.4688 9.03125 18.25 12.5 18.25C15.9375 18.25 18.75 15.4688 18.75 12ZM16.5 11.375V12.625C16.5 12.8438 16.3125 13 16.125 13H12.5V15.0938C12.5 15.4375 12.0938 15.5938 11.8438 15.375L8.75 12.2812C8.59375 12.125 8.59375 11.9062 8.75 11.75L11.8438 8.65625C12.0938 8.40625 12.5 8.59375 12.5 8.90625V11H16.125C16.3125 11 16.5 11.1875 16.5 11.375Z'
          fill='#333333'
        />
      </svg>
      <p className='text-sm font-normal'>Kembali</p>
    </button>
  );
};
