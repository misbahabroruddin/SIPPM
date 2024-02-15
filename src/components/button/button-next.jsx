"use client";

import { twMerge } from "tailwind-merge";

export const ButtonNext = ({ className, ...props }) => {
  return (
    <button
      className={twMerge(
        "flex justify-center items-center gap-1 p-2 w-[200px] bg-[#10487A] rounded text-white disabled:bg-gray-500 disabled:cursor-not-allowed",
        className
      )}
      type='submit'
      {...props}
    >
      <p className='text-sm font-normal'>Lanjut</p>
      <svg
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20.25 12C20.25 16.2812 16.7812 19.75 12.5 19.75C8.21875 19.75 4.75 16.2812 4.75 12C4.75 7.71875 8.21875 4.25 12.5 4.25C16.7812 4.25 20.25 7.71875 20.25 12ZM6.25 12C6.25 15.4688 9.03125 18.25 12.5 18.25C15.9375 18.25 18.75 15.4688 18.75 12C18.75 8.5625 15.9375 5.75 12.5 5.75C9.03125 5.75 6.25 8.5625 6.25 12ZM8.5 12.625V11.375C8.5 11.1875 8.65625 11 8.875 11H12.5V8.90625C12.5 8.59375 12.875 8.40625 13.125 8.65625L16.2188 11.75C16.375 11.9062 16.375 12.125 16.2188 12.2812L13.125 15.375C12.875 15.625 12.5 15.4375 12.5 15.0938V13H8.875C8.65625 13 8.5 12.8438 8.5 12.625Z'
          fill='white'
        />
      </svg>
    </button>
  );
};
