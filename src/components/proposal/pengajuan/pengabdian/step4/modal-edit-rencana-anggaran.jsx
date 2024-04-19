"use client";

import { useState } from "react";
import Image from "next/image";

import { Modal } from "@/components/modal";
import { FormRencanaAnggaranPKM } from "./form-rencana-anggaran";

export const ModalEditRencanaAnggaran = ({ id }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  return (
    <>
      <button className="rounded-lg" onClick={openModal}>
        <Image src="/icons/edit.svg" width={24} height={24} alt="edit" />
      </button>
      <Modal onClose={() => setOpen(false)} open={open}>
        <h2 className="mb-7 text-center text-[20px] font-[500] text-primary">
          Rencana Anggaran
        </h2>
        <FormRencanaAnggaranPKM id={id} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};
