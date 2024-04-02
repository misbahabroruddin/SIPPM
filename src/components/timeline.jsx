"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const Timeline = ({ children }) => {
  return <ul className="flex w-full flex-col">{children}</ul>;
};

export const TimelineConnector = () => {
  return (
    <span
      className="absolute -left-1 hidden justify-center bg-transparent transition-opacity duration-200 lg:grid"
      style={{
        top: "16px",
        width: "24px",
        height: "calc(100% - 16px)",
        opacity: 1,
      }}
    >
      <span className="h-full w-0.5 bg-dark-metallic"></span>
    </span>
  );
};

export const TimelineHeader = ({ status = "null" }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="relative z-[2] hidden w-max flex-shrink-0 overflow-hidden rounded-full !border-none bg-gray-900 p-0 text-white lg:flex">
        {status === "Diterima" && (
          <Image
            src={`/icons/track/disetujui.svg`}
            alt={status}
            width={16}
            height={16}
          />
        )}
        {status === "Pending" && (
          <Image
            src={`/icons/track/pending.svg`}
            alt={status}
            width={16}
            height={16}
          />
        )}
        {status === "Revisi" && (
          <Image
            src={`/icons/track/revisi.svg`}
            alt={status}
            width={16}
            height={16}
          />
        )}
        {status === "Ditolak" && (
          <Image
            src={`/icons/track/tolak.svg`}
            alt={status}
            width={16}
            height={16}
          />
        )}
        {status === "null" && (
          <Image
            src={`/icons/track/null.svg`}
            alt={status || "null"}
            width={16}
            height={16}
          />
        )}
      </span>
    </div>
  );
};

export const TimelineItem = ({ date = "3 November 2021", children }) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap">
      <div className="flex w-[150px] flex-col ">
        <p className="text-dark-09">{date || "Not Yet"}</p>
        <span className="grow"></span>
      </div>
      <li className="relative flex grow flex-col gap-1 ">{children}</li>
    </div>
  );
};

export const TimelineContent = ({ children, className }) => {
  return (
    <div className={twMerge("flex w-full gap-3 pb-8 ", className)}>
      <span className="pointer-events-none invisible hidden h-full w-3 flex-shrink-0 lg:flex lg:w-6"></span>
      {children}
    </div>
  );
};
