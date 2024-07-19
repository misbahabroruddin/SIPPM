"use client";

import { useQueryGetFile } from "@/handlers/file-storage/query-get-file";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const ModalViewerPDF = dynamic(() => import("./../../modal-pdf-viewer"), {
  ssr: false,
});

export const DetailListBerkas = ({ data }) => {
  return (
    <>
      {data?.data?.length
        ? data?.data?.map((doc) => (
            <div className="flex flex-col gap-2" key={doc.id}>
              <h5 className="text-sm lg:text-base">{doc.jenis_dokumen.nama}</h5>
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/file.svg"
                  width={24}
                  height={24}
                  alt="File"
                />
                <ModalViewerPDF
                  data={doc?.url}
                  fileName={doc?.jenis_dokumen?.nama || "NAMA"}
                />
              </div>
            </div>
          ))
        : null}
      {/* <div className="flex flex-col gap-2">
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
      </div> */}
    </>
  );
};
