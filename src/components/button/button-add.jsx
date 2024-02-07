"use client";

import Image from "next/image";

export const ButtonAdd = ({ onClick, text = "Pengajuan", ...props }) => {
  return (
    <button
      className='flex gap-2 items-center px-4 py-2 bg-[#23B900] rounded text-white'
      onClick={onClick}
      {...props}
    >
      <Image
        src='/icons/plus-circle-white.svg'
        width={24}
        height={24}
        alt='tab'
      />
      <p>{text}</p>
    </button>
  );
};
