"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";

import { ModalDetailAnggotaMahasiswa } from "./modal-detail-anggota-mahasiswa";
import { useDeleteAnggotaPKM } from "@/handlers/dosen/pengabdian/anggota/delete-anggota-pkm";

export const TableAnggotaMahasiswaPKM = ({ data }) => {
  const header = [
    "No",
    "Nama Lengkap",
    "Perguruan Tinggi",
    "NIM",
    "Program Studi",
    "Email",
    "Action",
  ];

  const { onDeleteAnggotaMahasiswaPKM, isLoadingMahasiswaPKM } =
    useDeleteAnggotaPKM();

  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left !font-poppins">
      <thead className="rounded-lg">
        <tr>
          {header.map((head) => (
            <th key={head} className="  bg-primary p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="text-center font-poppins font-semibold leading-none text-white"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.data.length > 0 ? (
          data?.data.map((row, index) => {
            return (
              <tr key={row.id} className="text-base even:bg-sky">
                <td className="p-3">
                  <Typography
                    color="blue-gray"
                    className="text-center font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-3 ">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.nama_lengkap}
                  </Typography>
                </td>
                <td className="p-3">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.perguruan_tinggi}
                  </Typography>
                </td>
                <td className="p-3 text-center">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.nidn_or_nidk_or_nim}
                  </Typography>
                </td>
                <td className="p-3 text-center">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.program_studi?.nama || "-"}
                  </Typography>
                </td>
                <td className="p-3 text-center">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.email || "-"}
                  </Typography>
                </td>
                <td className="flex items-center justify-center gap-1 py-3 text-center">
                  <ModalDetailAnggotaMahasiswa id={row.id} />
                  <button
                    className="rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => onDeleteAnggotaMahasiswaPKM(row.id)}
                    disabled={isLoadingMahasiswaPKM}
                  >
                    <Image
                      src="/icons/delete.svg"
                      width={24}
                      height={24}
                      alt="delete"
                    />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="text-base even:bg-sky">
            <td className="p-3" colSpan={7}>
              <Typography color="blue-gray" className="text-center font-normal">
                Tidak ada anggota
              </Typography>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
