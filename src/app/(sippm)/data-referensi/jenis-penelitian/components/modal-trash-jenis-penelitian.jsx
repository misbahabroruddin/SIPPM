"use client";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { TableTrashJenisPenelitian } from "./table-trash-jenis-penelitian";

export const ModalTrashJenisPenelitian = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);

  return (
    <>
      <button
        className="flex items-center gap-2 rounded border border-primary px-4 py-2 text-primary disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleOpenModal}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path
              d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909"
              stroke="#000000"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6"
              stroke="#000000"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <p>Trash</p>
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"lg:w-[900px]"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-[500]">
            Trash Jenis Penelitian
          </h1>
          <TableTrashJenisPenelitian onClose={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  );
};
