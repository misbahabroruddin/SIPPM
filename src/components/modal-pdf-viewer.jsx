"use client";

import { Modal } from "@/components/modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon } from "./svgs/close";

const ModalViewerPDF = ({ data, fileName }) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 720) {
        setOpen(false);
      }
    });
  }, [open]);
  return (
    <>
      <button
        onClick={data && handleOpenModal}
        className={`hidden text-black-07 md:block ${data ? "cursor-pointer hover:underline" : "cursor-default"}`}
      >
        {data ? fileName : "Tidak ada berkas"}
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={
          "w-[300px] md:w-[650px] lg:w-[800px] xl:w-[1000px] flex-col items-end p-2 hidden md:flex"
        }
      >
        <CloseIcon onClick={() => setOpen(false)} />
        <embed
          src={data}
          width={"100%"}
          height={"500px"}
          className="mt-2 rounded"
          type="application/pdf"
        />
      </Modal>
      <div className="flex gap-2 md:hidden">
        <Link
          href={data ? data : "#"}
          target={data ? "_blank" : ""}
          className="disabled:cursor-default"
        >
          <button
            disabled={data ? false : true}
            className="text-sm text-black-07 hover:underline disabled:cursor-default hover:disabled:no-underline lg:text-base"
          >
            {data ? fileName : "Tidak ada berkas"}
          </button>
        </Link>
      </div>
    </>
  );
};

export default ModalViewerPDF;
