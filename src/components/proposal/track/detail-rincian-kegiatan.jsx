"use client";

import { TableDetailRincianKegiatan } from "./table-detail-rincian-kegiatan";

export const DetailRincianKegiatan = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-[500]">Rincian Kegiatan</h4>
      <TableDetailRincianKegiatan data={data} />
    </div>
  );
};
