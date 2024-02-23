"use client";

import { useState } from "react";

import { ButtonAdd } from "@/components/button/button-add";
import { FormRincianKegiatanPKM } from "./form-rincian-kegiatan-pkm";
import { Modal } from "@/components/modal";

export const ModalRincianKegiatan = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  return (
    <>
      <ButtonAdd text='Tambah' onClick={openModal} />
      <Modal onClose={() => setOpen(false)} open={open}>
        <h2 className='text-primary text-[20px] font-[500] text-center mb-7'>
          Rencana Anggaran
        </h2>
        <FormRincianKegiatanPKM onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};
