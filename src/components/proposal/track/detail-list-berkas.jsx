"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const ModalViewerPDF = dynamic(() => import("./../../modal-pdf-viewer"), {
  ssr: false,
});

export const DetailListBerkas = ({ data }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h5 className="text-sm lg:text-base">File Proposal</h5>
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={24} height={24} alt="File" />
          <ModalViewerPDF
            data={data?.data?.file_proposal?.url}
            fileName={data?.data?.file_proposal?.nama}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-sm lg:text-base">Pernyataan Mitra</h5>
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={24} height={24} alt="File" />
          <ModalViewerPDF
            data={data?.data?.file_pernyataan_mitra}
            fileName={data?.data?.file_pernyataan_mitra?.nama}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-sm lg:text-base">File CV</h5>
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={24} height={24} alt="File" />
          <ModalViewerPDF
            data={data?.data?.file_cv?.url}
            fileName={data?.data?.file_cv?.nama}
          />
        </div>
      </div>
    </>
  );
};
