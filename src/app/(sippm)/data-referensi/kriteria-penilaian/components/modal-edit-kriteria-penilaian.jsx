"use client";

import Image from "next/image";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { FormEditKriteriaPenilaian } from "./form-edit-kriteria-penilaian";
import { useQueryGetDetailKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/query-get-detail-kriteria-penilaian";

export const ModalEditKriteriaPenilaian = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { data, refetch, isLoading } = useQueryGetDetailKriteriaPenilaian(id);

  const handleOpenModal = () => {
    setOpen(true);
    refetch();
  };

  return (
    <>
      <button className="rounded-lg" onClick={handleOpenModal} title="Edit">
        <Image src="/icons/edit.svg" width={24} height={24} alt="edit" />
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"lg:w-[500px]"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-[500]">
            Edit Kriteria Penilaian
          </h1>
          <FormEditKriteriaPenilaian
            id={id}
            setOpen={setOpen}
            data={data}
            isLoading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};
