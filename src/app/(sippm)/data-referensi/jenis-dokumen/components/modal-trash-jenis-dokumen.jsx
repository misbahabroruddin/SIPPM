"use client";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { TableTrashJenisDokumen } from "./table-trash-jenis-dokumen";
import { TrashIcon } from "@/components/svgs/trash";

export const ModalTrashJenisDokumen = () => {
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
            Trash Jenis Dokumen
          </h1>
          <TableTrashJenisDokumen onClose={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  );
};
