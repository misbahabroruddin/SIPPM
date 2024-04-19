"use client";
import { useState } from "react";

import { ButtonAdd } from "@/components/button/button-add";
import { FormRencanaAnggaranPKM } from "./form-rencana-anggaran";
import { Modal } from "@/components/modal";

export const ModalTambahRencanaAnggaranPKM = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  return (
    <>
      <ButtonAdd
        text="Tambah"
        onClick={openModal}
        className="w-full justify-center px-2 py-1 md:w-fit lg:px-4 lg:py-2"
      />
      <Modal onClose={() => setOpen(false)} open={open}>
        <h2 className="mb-7 text-center text-[20px] font-[500] text-primary">
          Rencana Anggaran
        </h2>
        <FormRencanaAnggaranPKM onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};
