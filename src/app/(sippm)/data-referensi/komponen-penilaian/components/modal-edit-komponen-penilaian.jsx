"use client";

import Image from "next/image";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { FormEditKomponenPenilaian } from "./form-edit-komponen-penilaian";
import { useQueryGetDetailKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/query-get-detail-komponen-penilaian";

export const ModalEditKomponenPenilaian = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { data, refetch, isLoading } = useQueryGetDetailKomponenPenilaian(id);

  console.log(data, "<<<<<<");

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
            Edit Komponen Penilaian
          </h1>
          <FormEditKomponenPenilaian
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
