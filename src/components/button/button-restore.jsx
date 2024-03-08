"use client";

import Image from "next/image";

export const ButtonRestore = ({ onClick }) => {
  return (
    <button
      className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
      onClick={onClick}
      title="Restore"
    >
      <Image src="/icons/restore.svg" width={24} height={24} alt="restore" />
    </button>
  );
};
