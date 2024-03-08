"use client";
import { useState } from "react";

import { Modal } from "@/components/modal";
import Image from "next/image";
import { FormEditJabatanFungsional } from "./form-edit-jabatan-fungsional";

export const ModalEditJabatanFungsional = ({ id }) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  return (
    <>
      <button className="rounded-lg" onClick={handleOpenModal}>
        <Image src="/icons/edit.svg" width={24} height={24} alt="edit" />
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"lg:w-[500px]"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-[500]">
            Edit Jabatan Fungsional
          </h1>
          <FormEditJabatanFungsional id={id} setOpen={setOpen} />
        </div>
      </Modal>
    </>
  );
};