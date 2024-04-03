"use client";

import { TableDetailRencanaAnggaran } from "./table-detail-rencana-anggaran";

export const DetailRencanaAnggaran = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-[500]">Rincian Biaya</h4>
      <TableDetailRencanaAnggaran data={data} />
    </div>
  );
};
