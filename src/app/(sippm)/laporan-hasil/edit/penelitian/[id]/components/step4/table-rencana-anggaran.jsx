"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";

import { ModalEditRencanaAnggaran } from "./modal-edit-anggaran";
import { useDeleteRencanaAnggaranLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/rencana-anggaran/delete-rencana-anggaran";

export const TableRencanaAnggaran = ({ data }) => {
  const header = ["No", "Rincian", "Biaya", "Action"];
  const { deleteRencanaAnggaranPenelitian, isLoadingSubmit } =
    useDeleteRencanaAnggaranLaporanHasilPenelitian();
  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left">
      <thead className="rounded-lg">
        <tr>
          {header.map((head) => (
            <th
              key={head}
              className="  bg-primary p-4 last:w-36 last:text-center"
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
        {data?.data.length > 0 ? (
          <>
            {data?.data.map((row, index) => {
              return (
                <tr key={row.id} className="text-base even:bg-sky">
                  <td className="w-8 p-3">
                    <Typography
                      color="blue-gray"
                      className="text-center font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-3 ">
                    <Typography color="blue-gray" className="font-normal">
                      {row.rincian}
                    </Typography>
                  </td>
                  <td className="w-52 p-3 xl:w-[550px]">
                    <Typography color="blue-gray" className="font-normal">
                      {row.biaya?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </Typography>
                  </td>
                  <td className="flex w-36 items-center justify-center gap-1 py-3 text-center">
                    <ModalEditRencanaAnggaran id={row.id} />
                    <button
                      className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => deleteRencanaAnggaranPenelitian(row.id)}
                      disabled={isLoadingSubmit}
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
            })}
            <tr className="border-t border-primary">
              <td></td>
              <td colSpan={1} className="p-3">
                Total
              </td>
              <td colSpan={2} className="p-3">
                {data?.data
                  .reduce((total, item) => {
                    return total + item.biaya;
                  }, 0)
                  ?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
              </td>
            </tr>
          </>
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
