"use client";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { TableTrashKriteriaPenilaian } from "./table-trash-kriteria-penilaian";
import { TrashIcon } from "@/components/svgs/trash";

export const ModalTrashKriteriaPenilaian = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);

  return (
    <>
      <button
        className="flex items-center gap-2 rounded border border-primary px-4 py-2 text-primary disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleOpenModal}
      >
        <TrashIcon />
        <p>Trash</p>
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"lg:w-[900px]"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-[500]">
            Trash Kriteria Penilaian
          </h1>
          <TableTrashKriteriaPenilaian onClose={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  );
};
