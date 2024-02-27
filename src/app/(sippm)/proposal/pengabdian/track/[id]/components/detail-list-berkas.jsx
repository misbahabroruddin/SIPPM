"use client";

import Image from "next/image";

import { ModalViewerPDF } from "@/components/modal-pdf-viewer";

export const DetailListBerkas = ({ data }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h5>File Proposal</h5>
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={24} height={24} alt="File" />
          <ModalViewerPDF data={data?.data?.file_proposal} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h5>Pernyataan Mitra</h5>
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={24} height={24} alt="File" />
          <ModalViewerPDF data={data?.data?.file_pernyataan_mitra} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h5>File Proposal</h5>
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={24} height={24} alt="File" />
          <ModalViewerPDF data={data?.data?.file_proposal} />
        </div>
      </div>
    </>
  );
};
