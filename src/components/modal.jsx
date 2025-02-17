"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const Modal = ({ open, onClose, children, containerClassName }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[1000] grid place-items-center transition-colors ${
        open ? "visible bg-black/20 backdrop-blur" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          `w-80 rounded-lg bg-white p-6 shadow transition-all lg:w-[500px] ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`,
          containerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};
