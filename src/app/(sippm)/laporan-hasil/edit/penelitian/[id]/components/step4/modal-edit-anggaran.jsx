"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Modal } from "@/components/modal";
import { FormRencanaAnggaran } from "./form-rencana-anggaran";
import { useQueryDetailRencanaAnggaranLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/rencana-anggaran/query-detail-rencana-anggaran";

export const ModalEditRencanaAnggaran = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { data, refetch } =
    useQueryDetailRencanaAnggaranLaporanHasilPenelitian(id);

  const openModal = () => {
    setOpen(true);
    refetch();
  };

  return (
    <>
      <button className="rounded-lg" onClick={openModal}>
        <Image src="/icons/edit.svg" width={24} height={24} alt="edit" />
      </button>
      <Modal onClose={() => setOpen(false)} open={open}>
        <h2 className="mb-7 text-center text-[20px] font-[500] text-primary">
          Edit Rencana Anggaran
        </h2>
        <FormRencanaAnggaran
          id={id}
          onClose={() => setOpen(false)}
          data={data}
        />
      </Modal>
    </>
  );
};
