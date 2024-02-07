"use client";

import { twMerge } from "tailwind-merge";

export const ButtonStatus = ({ data }) => {
  let buttonClass = "bg-[#D5FACC] text-[#23B900]";
  let buttonText = "Disetujui";

  if (data === "approve") {
    buttonClass = "bg-[#D5FACC] text-[#23B900]";
    buttonText = "Disetujui";
  } else if (data === "pending") {
    buttonClass = "bg-[#FFF7CC] text-[#998200]";
    buttonText = "Pending";
  } else {
    buttonClass = "bg-[#CCCCCC] text-[#333333]";
    buttonText = "Not Yet";
  }
  return (
    <button className={twMerge("px-4 py-1 rounded-lg", buttonClass)} disabled>
      {buttonText}
    </button>
  );
};
