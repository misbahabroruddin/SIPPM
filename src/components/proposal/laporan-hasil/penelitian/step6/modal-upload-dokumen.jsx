"use client";

import { useState } from "react";

import { UploadIcon } from "@/components/svgs/upload";
import { Modal } from "@/components/modal";
import { CloseIcon } from "@/components/svgs/close";
import ReactDropzone from "@/components/input/react-dropzone";

export const ModalUploadDokumen = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  return (
    <>
      <button
        className="inline-flex gap-2 rounded-lg bg-sky-05 px-4 py-2"
        onClick={handleOpenModal}
      >
        <UploadIcon />
        <span className="text-white">Unggah Dokumen</span>
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={
          "w-[300px] md:w-[650px] lg:w-[800px] xl:w-[1000px] flex-col p-4 hidden md:flex"
        }
      >
        <div className="flex justify-between">
          <h2>Unggah Dokumen</h2>
          <CloseIcon onClick={() => setOpen(false)} />
        </div>
        <ReactDropzone onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};
