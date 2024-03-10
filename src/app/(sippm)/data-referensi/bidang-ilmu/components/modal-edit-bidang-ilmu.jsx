"use client";
import { useState } from "react";

import { Modal } from "@/components/modal";
import Image from "next/image";
import { FormEditBidangIlmu } from "./form-edit-bidang-ilmu";
import { useQueryGetDetailBidangIlmu } from "@/handlers/data-referensi/bidang-ilmu/administrator/query-detail-bidang-ilmu";

export const ModalEditBidangIlmu = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data, refetch, isLoading } = useQueryGetDetailBidangIlmu(id);

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
          <FormEditBidangIlmu
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
