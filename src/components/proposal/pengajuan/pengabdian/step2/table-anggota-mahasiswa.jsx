"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

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
          {header.map((head, index) => (
            <th
              key={head}
              className={twMerge(
                "bg-primary p-2 lg:p-4",
                index === 0 && "hidden lg:table-cell",
                index === 1 && "w-32 sm:w-fit",
                index === 2 && "w-20 sm:w-fit",
                index === 3 && "hidden lg:table-cell",
                index === 4 && "hidden lg:table-cell",
                index === 5 && "hidden lg:table-cell",
                index === 6 && "w-9 md:w-fit",
              )}
            >
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
                <td className="hidden p-2 lg:table-cell lg:p-3">
                  <Typography
                    color="blue-gray"
                    className="text-center font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="w-32 p-2 sm:w-fit lg:p-3">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.nama_lengkap}
                  </Typography>
                </td>
                <td className="w-20 p-2 sm:w-fit lg:p-3">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.perguruan_tinggi}
                  </Typography>
                </td>
                <td className="hidden p-2 lg:table-cell lg:p-3">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.nidn_or_nidk_or_nim}
                  </Typography>
                </td>
                <td className="hidden p-2 lg:table-cell lg:p-3">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.program_studi?.nama || "-"}
                  </Typography>
                </td>
                <td className="hidden p-2 lg:table-cell lg:p-3">
                  <Typography color="blue-gray" className="font-normal">
                    {row.anggota.email || "-"}
                  </Typography>
                </td>
                <td className="mx-auto py-2 text-center lg:py-3">
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
            <td className="w-[300px] p-3" colSpan={7}>
              <Typography
                color="blue-gray"
                className="text-center font-poppins text-sm font-normal lg:text-base"
              >
                Tidak ada anggota
              </Typography>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
