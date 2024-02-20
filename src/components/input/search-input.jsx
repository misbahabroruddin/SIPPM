"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const SearchInput = ({ onChange, className, ...props }) => {
  return (
    <div className='w-52 lg:w-64 xl:w-[400px]'>
      <div className='relative w-full min-w-[200px] h-9'>
        <div className='grid place-items-center absolute text-blue-gray-500 top-2/4 right-3 -translate-y-2/4 w-5 h-5'>
          <Image src='/icons/search.svg' height={24} width={24} alt='search' />
        </div>
        <input
          type='text'
          placeholder='Search'
          className={twMerge(
            "peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border text-sm px-3 py-2.5  !pr-9 border-blue-gray-200 focus:border-gray-900 rounded-lg",
            className
          )}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};
