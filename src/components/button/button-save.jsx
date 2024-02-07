"use client";

import { twMerge } from "tailwind-merge";

export const ButtonSave = ({ className, iconLeft, ...props }) => {
  return (
    <button
      className={twMerge(
        "flex justify-center items-center gap-1 p-2 w-[200px] bg-primary rounded text-white",
        className
      )}
      type='submit'
      {...props}
    >
      <p className={twMerge("text-sm font-normal", iconLeft && "order-1")}>
        Simpan
      </p>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.5312 8.0625C18.8125 8.34375 19 8.71875 19 9.125V17.5C19 18.3438 18.3125 19 17.5 19H6.5C5.65625 19 5 18.3438 5 17.5V6.5C5 5.6875 5.65625 5 6.5 5H14.875C15.2812 5 15.6562 5.1875 15.9375 5.46875L18.5312 8.0625ZM13.5 6.5H9.5V9H13.5V6.5ZM17.3125 17.5C17.4062 17.5 17.5 17.4375 17.5 17.3125V9.21875C17.5 9.15625 17.4688 9.125 17.4375 9.09375L15 6.625V9.75C15 10.1875 14.6562 10.5 14.25 10.5H8.75C8.3125 10.5 8 10.1875 8 9.75V6.5H6.6875C6.5625 6.5 6.5 6.59375 6.5 6.6875V17.3125C6.5 17.4375 6.5625 17.5 6.6875 17.5H17.3125ZM12 11.25C13.5 11.25 14.75 12.5 14.75 14C14.75 15.5312 13.5 16.75 12 16.75C10.4688 16.75 9.25 15.5312 9.25 14C9.25 12.5 10.4688 11.25 12 11.25ZM12 15.25C12.6875 15.25 13.25 14.7188 13.25 14C13.25 13.3125 12.6875 12.75 12 12.75C11.2812 12.75 10.75 13.3125 10.75 14C10.75 14.7188 11.2812 15.25 12 15.25Z'
          fill='white'
        />
      </svg>
    </button>
  );
};
