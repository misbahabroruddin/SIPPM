"use client";

import { DetailListBerkas } from "./detail-list-berkas";
import { FormVerifikasiUsulan } from "./form-verifikasi-usulan-lppm";

export const DetailBerkas = ({ data, statusLppm }) => {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-lg font-[500]">Berkas</h4>
      <DetailListBerkas data={data} />
      {statusLppm !== "Diterima" && <FormVerifikasiUsulan />}
    </div>
  );
};
