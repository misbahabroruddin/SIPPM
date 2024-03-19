"use client";
import { useState } from "react";

import { ButtonAdd } from "@/components/button/button-add";
import { Modal } from "@/components/modal";
import { FormTambahDosen } from "./form-tambah-dosen";

export const ModalTambahAnggotaDosen = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);

  return (
    <>
      <ButtonAdd text="Tambah" onClick={handleOpenModal} />
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"w-[300px] sm:w-[400px] md:w-[600px] lg:w-[700px]"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-[500]">
            Tambah Anggota Dosen
          </h1>
          <FormTambahDosen setOpen={setOpen} />
        </div>
      </Modal>
    </>
  );
};
