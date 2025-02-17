"use client";
import { useState } from "react";

import { ButtonAdd } from "@/components/button/button-add";
import { FormRencanaAnggaran } from "./form-rencana-anggaran";
import { Modal } from "@/components/modal";

export const ModalTambahRencanaAnggaran = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  return (
    <>
      <ButtonAdd text="Tambah" onClick={openModal} />
      <Modal onClose={() => setOpen(false)} open={open}>
        <h2 className="mb-7 text-center text-[20px] font-[500] text-primary">
          Rencana Anggaran
        </h2>
        <FormRencanaAnggaran onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};
