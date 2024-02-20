"use client";

import { twMerge } from "tailwind-merge";

export const ButtonStatus = ({ status, className }) => {
  let buttonClass = "bg-[#D5FACC] text-[#23B900]";
  let buttonText = "Disetujui";

  if (status === "Diterima") {
    buttonClass = "bg-[#D5FACC] text-[#23B900]";
    buttonText = "Disetujui";
  } else if (status === "Pending") {
    buttonClass = "bg-[#DAEDFF] text-[#44A7FF]";
    buttonText = "Pending";
  } else if (status === "Revisi") {
    buttonClass = "bg-[#FFF7CC] text-[#998200]";
    buttonText = "Revisi";
  } else if (status === "Ditolak") {
    buttonClass = "bg-[#FF6666] text-[#ffffff]";
    buttonText = "Ditolak";
  } else {
    buttonClass = "bg-[#CCCCCC] text-[#333333]";
    buttonText = "Not Yet";
  }
  return (
    <button
      className={twMerge(`px-4 py-1 rounded-lg ${buttonClass}`, className)}
      disabled
    >
      {buttonText}
    </button>
  );
};
