"use client";
import { useState } from "react";
import Image from "next/image";

import { Modal } from "@/components/modal";
import { useQueryAdministratorDetailAnggota } from "@/handlers/anggota/administrator/query-detail-anggota";
import { FormEditAnggotaDosen } from "./form-edit-anggota-dosen";

export const ModalEditAnggotaDosen = (anggota) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useQueryAdministratorDetailAnggota(
    anggota.id,
  );
  const handleOpenModal = () => {
    setOpen(true);
    refetch();
  };

  return (
    <>
      <button className="rounded-lg" onClick={handleOpenModal}>
        <Image src="/icons/edit.svg" width={24} height={24} alt="edit" />
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"w-[300px] sm:w-[400px] md:w-[600px] lg:w-[700px]"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-[500]">Edit Anggota Dosen</h1>
          <FormEditAnggotaDosen
            setOpen={setOpen}
            data={data}
            isLoading={isLoading}
            anggotaId={anggota.id}
          />
        </div>
      </Modal>
    </>
  );
};
