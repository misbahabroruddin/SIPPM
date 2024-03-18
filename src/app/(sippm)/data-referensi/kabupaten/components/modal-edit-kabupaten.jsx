"use client";
import { useState } from "react";

import { Modal } from "@/components/modal";
import Image from "next/image";
import { FormEditKabupaten } from "./form-edit-kabupaten";
import { useQueryGetDetailKabupaten } from "@/handlers/data-referensi/kabupaten/administator/query-detail-kabupaten";

export const ModalEditKabupaten = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data, refetch, isLoading } = useQueryGetDetailKabupaten(id);

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
        containerClassName={"lg:w-[500px]"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-[500]">Edit Bidang Ilmu</h1>
          <FormEditKabupaten
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
