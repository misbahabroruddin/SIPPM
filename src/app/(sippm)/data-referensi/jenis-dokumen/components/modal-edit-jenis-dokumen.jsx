"use client";

import Image from "next/image";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { useQueryGetDetailJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/query-get-detail-jenis-dokumen";
import { FormEditJenisDokumen } from "./form-edit-jenis-dokumen";

export const ModalEditJenisDokumen = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { data, refetch, isLoading } = useQueryGetDetailJenisDokumen(id);

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
          <h1 className="text-center text-lg font-[500]">Edit Jenis Dokumen</h1>
          <FormEditJenisDokumen
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
