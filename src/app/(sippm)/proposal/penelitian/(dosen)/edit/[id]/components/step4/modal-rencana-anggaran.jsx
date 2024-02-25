"use client";
import { useState } from "react";

import { ButtonAdd } from "@/components/button/button-add";
import { FormRencanaAnggaran } from "./form-rencana-anggaran";
import { Modal } from "@/components/modal";

export const ModalRencanaAnggaran = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  return (
    <>
      <ButtonAdd text='Tambah' onClick={openModal} />
      <Modal onClose={() => setOpen(false)} open={open}>
        <h2 className='text-primary text-[20px] font-[500] text-center mb-7'>
          Rencana Anggaran
        </h2>
        <FormRencanaAnggaran onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};
