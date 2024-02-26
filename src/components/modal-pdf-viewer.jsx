"use client";

import { Modal } from "@/components/modal";
import { useState } from "react";

export const ModalViewerPDF = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  return (
    <>
      <button
        onClick={data && handleOpenModal}
        className={`text-black-07 ${data ? "cursor-pointer hover:underline" : "cursor-default"}`}
      >
        {data ? "Klik untuk lebih detail" : "Tidak ada berkas"}
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={
          "w-[300px] md:w-[550px] lg:w-[700px] xl:w-[900px] flex flex-col items-end p-2"
        }
      >
        <i className="w-fit " onClick={() => setOpen(false)} role="button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.25C7.71875 4.25 4.25 7.71875 4.25 12C4.25 16.2812 7.71875 19.75 12 19.75C16.2812 19.75 19.75 16.2812 19.75 12C19.75 7.71875 16.2812 4.25 12 4.25ZM12 18.25C8.53125 18.25 5.75 15.4688 5.75 12C5.75 8.5625 8.53125 5.75 12 5.75C15.4375 5.75 18.25 8.5625 18.25 12C18.25 15.4688 15.4375 18.25 12 18.25ZM15.1562 10.0625C15.3125 9.9375 15.3125 9.6875 15.1562 9.53125L14.4688 8.84375C14.3125 8.6875 14.0625 8.6875 13.9375 8.84375L12 10.7812L10.0312 8.84375C9.90625 8.6875 9.65625 8.6875 9.5 8.84375L8.8125 9.53125C8.65625 9.6875 8.65625 9.9375 8.8125 10.0625L10.75 12L8.8125 13.9688C8.65625 14.0938 8.65625 14.3438 8.8125 14.5L9.5 15.1875C9.65625 15.3438 9.90625 15.3438 10.0312 15.1875L12 13.25L13.9375 15.1875C14.0625 15.3438 14.3125 15.3438 14.4688 15.1875L15.1562 14.5C15.3125 14.3438 15.3125 14.0938 15.1562 13.9688L13.2188 12L15.1562 10.0625Z"
              fill="#666666"
            />
          </svg>
        </i>
        <iframe
          src={data}
          width={"100%"}
          height={"500px"}
          className="mt-2 rounded"
        />
      </Modal>
    </>
  );
};
