"use client";

import { DetailListBerkas } from "./detail-list-berkas";
import { FormVerifikasiUsulanReviewer } from "./form-verifikasi-usulan-reviewer";

export const DetailBerkasReviewer = ({ data }) => {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-lg font-[500]">Berkas</h4>
      <DetailListBerkas data={data} />
      {data?.data?.status_lppm === "Diterima" && (
        <FormVerifikasiUsulanReviewer />
      )}
    </div>
  );
};
