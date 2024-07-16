"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

import { ModalDetailAnggotaDosen } from "./modal-detail-anggota-dosen";
import { useDeleteAnggotaProposal } from "@/handlers/dosen/proposal/anggota/delete-anggota";

export const TableAnggotaDosen = ({ data }) => {
  const { onDeleteAnggotaDosen, isLoadingDosen } = useDeleteAnggotaProposal();

  const header = [
    "No",
    "Nama Lengkap",
    "Perguruan Tinggi",
    "NIDN/NIDK",
    "Bidang Ilmu",
    "Jabatan Fungsional",
    "Action",
  ];

  return (
    <table className="w-full table-auto overflow-hidden rounded-t-lg text-left !font-poppins">
      <thead className="rounded-lg">
        <tr>
          {header.map((head, index) => (
            <th
              key={head}
              className={twMerge(
                "bg-primary p-4",
                index === 0 && "hidden lg:table-cell",
                index === 1 && "w-32 sm:w-fit",
                index === 2 && "w-20 sm:w-fit",
                index === 3 && "hidden lg:table-cell",
                index === 4 && "hidden lg:table-cell",
                index === 5 && "hidden lg:table-cell",
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
        {data?.data?.length ? (
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
                    {row.anggota.jabatan_fungsional?.nama || "-"}
                  </Typography>
                </td>
                <td className="mx-auto py-2 text-center lg:py-3">
                  <ModalDetailAnggotaDosen id={row.id} />
                  <button
                    className="rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => onDeleteAnggotaDosen(row.id)}
                    disabled={isLoadingDosen}
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
