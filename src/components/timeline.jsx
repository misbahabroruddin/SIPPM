"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const Timeline = ({ children }) => {
  return <ul className="flex w-full flex-col">{children}</ul>;
};

export const TimelineConnector = () => {
  return (
    <span
      className="absolute -left-1 grid justify-center bg-transparent transition-opacity duration-200"
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
      <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full !border-none bg-gray-900 p-0 text-white">
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
    <div className="flex gap-2">
      <div className="flex w-[150px] min-w-fit flex-col">
        <p className="text-dark-09">{date}</p>
        <span className="grow"></span>
      </div>
      <li className="relative flex grow flex-col gap-1 ">{children}</li>
    </div>
  );
};

export const TimelineContent = ({ children, className }) => {
  return (
    <div className={twMerge("flex w-full gap-3 pb-8", className)}>
      <span
        className="pointer-events-none invisible h-full flex-shrink-0"
        style={{ width: "24px" }}
      ></span>
      {children}
    </div>
  );
};
