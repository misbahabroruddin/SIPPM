"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const ModalViewerPDF = dynamic(
  () => import("./../../../../../../../components/modal-pdf-viewer"),
  { ssr: false },
);

export const DetailListBerkas = ({ data }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h5>File Proposal</h5>
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={24} height={24} alt="File" />
          <ModalViewerPDF
            data={data?.data?.file_proposal?.url}
            fileName={data?.data?.file_proposal?.nama}
          />
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
        <h5>File CV</h5>
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={24} height={24} alt="File" />
          <ModalViewerPDF data={data?.data?.file_cv} />
        </div>
      </div>
    </>
  );
};
