"use client";

import Image from "next/image";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { FormRincianKegiatanPKM } from "./form-rincian-kegiatan";

export const ModalEditRincianKegiatanPKM = ({ id }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  return (
    <>
      <button className="rounded-lg" onClick={openModal}>
        <Image src="/icons/edit.svg" width={24} height={24} alt="edit" />
      </button>
      <Modal onClose={() => setOpen(false)} open={open}>
        <h2 className="mb-7 text-center text-[20px] font-[500] text-primary">
          Rincian Kegiatan
        </h2>
        <FormRincianKegiatanPKM id={id} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};
