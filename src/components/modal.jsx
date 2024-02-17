"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const Modal = ({ open, onClose, children, containerClassName }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 grid place-items-center transition-colors z-[9999] ${
        open ? "visible bg-black/20 backdrop-blur" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          `bg-white rounded-lg shadow p-6 transition-all w-80 lg:w-[500px] ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`,
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
