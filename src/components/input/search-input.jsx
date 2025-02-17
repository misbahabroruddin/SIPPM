"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const SearchInput = ({
  onChange,
  className,
  placeholder = "Search",
  ...props
}) => {
  return (
    <div className="w-full lg:w-64 xl:w-[400px]">
      <div className="h-9.5 relative ml-auto w-full lg:ml-0 lg:min-w-[200px]">
        <div className="absolute right-3 top-2/4 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
          <Image src="/icons/search.svg" height={24} width={24} alt="search" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className={twMerge(
            "peer h-full w-full rounded-lg border border-[#eee] bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#eee] placeholder-shown:border-t-[#eee] focus:border focus:border-gray-900  focus:outline-0 disabled:cursor-not-allowed disabled:border-0 disabled:bg-blue-gray-50",
            className,
          )}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};
