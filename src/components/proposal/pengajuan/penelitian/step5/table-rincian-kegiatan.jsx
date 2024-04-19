"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

import { ModalEditRincianKegiatan } from "./modal-edit-rincian-kegiatan";
import { converDateRange } from "@/lib/utils/convertDate";
import { useDeleteRincianKegiatanPenelitian } from "@/handlers/dosen/penelitian/rincian-kegiatan/delete-rincian-kegiatan";

export const TableRincianKegiatan = ({ data }) => {
  const { deleteRincianKegiatanPenelitian, isLoadingDelete } =
    useDeleteRincianKegiatanPenelitian();
  const header = ["No", "Kegiatan", "Rentang Waktu", "Action"];

  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left">
      <thead className="rounded-lg">
        <tr>
          {header.map((head, index) => (
            <th
              key={head}
              className={twMerge(
                "bg-primary p-4",
                index === 0 && "hidden lg:table-cell",
                index === 1 && "w-20 sm:w-fit",
                index === 2 && "w-32 sm:w-fit  xl:w-[550px]",
              )}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-poppins font-semibold leading-none text-white"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.data.length ? (
          data?.data.map((row, index) => {
            return (
              <tr key={index} className="text-base even:bg-sky">
                <td className="hidden p-2 lg:table-cell lg:w-8 lg:p-3">
                  <Typography
                    color="blue-gray"
                    className="text-center font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="w-20 break-all p-2 sm:w-fit lg:p-3 ">
                  <Typography color="blue-gray" className="font-normal">
                    {row.kegiatan}
                  </Typography>
                </td>
                <td className="w-32 break-all p-2 sm:w-fit lg:p-3 xl:w-[550px] ">
                  <Typography color="blue-gray" className="font-normal">
                    {converDateRange(row.waktu)}
                  </Typography>
                </td>
                <td className="mx-auto w-7 py-2 text-center lg:py-3">
                  <ModalEditRincianKegiatan id={row?.id} />
                  <button
                    className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => deleteRincianKegiatanPenelitian(row?.id)}
                    disabled={isLoadingDelete}
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
          <tr>
            <td className="p-4 text-center" colSpan={4}>
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
