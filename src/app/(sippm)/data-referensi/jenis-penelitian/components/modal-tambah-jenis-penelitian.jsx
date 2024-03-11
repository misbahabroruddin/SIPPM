"use client";
import { useState } from "react";

import { ButtonAdd } from "@/components/button/button-add";
import { Modal } from "@/components/modal";
import { FormTambahJenisPenelitian } from "./form-tambah-jenis-penelitian";

export const ModalTambahJenisPenelitian = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);

  return (
    <>
      <ButtonAdd text="Tambah" onClick={handleOpenModal} />
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"lg:w-[500px]"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-[500]">
            Tambah Jenis Penelitian
          </h1>
          <FormTambahJenisPenelitian setOpen={setOpen} />
        </div>
      </Modal>
    </>
  );
};
