"use client";

import { TableDetailAnggotaDosen } from "./table-detail-anggota-dosen";
import { TableDetailAnggotaMahasiswa } from "./table-detail-anggota-mahasiswa";

export const DetailAnggota = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-[500]">Identitas Anggota Dosen</h4>
        <TableDetailAnggotaDosen data={data} />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-[500]">Identitas Anggota Mahasiswa</h4>
        <TableDetailAnggotaMahasiswa />
      </div>
    </div>
  );
};
