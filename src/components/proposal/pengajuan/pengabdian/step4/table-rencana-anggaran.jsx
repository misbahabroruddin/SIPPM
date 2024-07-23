"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { FormRencanaAnggaranPKM } from "./form-rencana-anggaran";
import { useDeleteRencanaAnggaran } from "@/handlers/dosen/proposal/rencana-anggaran/delete-rencana-anggaran";
import { convertToRupiah } from "@/lib/utils/convertToRupiah";

export const TableRencanaAnggaran = ({ data }) => {
  const header = ["No", "Rincian", "Biaya", "Action"];

  const [isOpenEmptyData, setisOpenEmptyData] = useState(false);
  const [isOpenHasData, setisOpenHasData] = useState(false);
  const [editingDataId, setEditingDataId] = useState();

  const { mutateAsync: deleteRencanaAnggaranPKM, isPending } =
    useDeleteRencanaAnggaran();

  return (
    <table className="w-full min-w-max table-auto rounded-t-lg text-left">
      <thead className="rounded-lg">
        <tr>
          {header.map((head, index) => (
            <th
              key={head}
              className={twMerge(
                "bg-primary p-4",
                index === 0 && "hidden rounded-tl-lg lg:table-cell",
                index === 1 && "w-20 sm:w-fit",
                index === 2 && "w-32 sm:w-fit  xl:w-[550px]",
                index === 3 && "w-14",
                index === header.length - 1 && "rounded-tr-lg",
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
          <>
            {data?.data.map((row, index) => {
              return editingDataId === row.id ? (
                <FormRencanaAnggaranPKM
                  id={row.id}
                  key={row.id}
                  onClose={() => setEditingDataId()}
                />
              ) : (
                <tr key={row.id} className="text-base even:bg-sky">
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
                      {row.rincian_biaya.rincian}
                    </Typography>
                  </td>
                  <td className="w-32 break-all p-2 sm:w-fit lg:p-3 xl:w-[550px] ">
                    <Typography color="blue-gray" className="font-normal">
                      {convertToRupiah(row.biaya)}
                    </Typography>
                  </td>
                  <td className="mx-auto w-7 py-2 text-center lg:py-3">
                    <button onClick={() => setEditingDataId(row.id)}>
                      <Image
                        src="/icons/edit.svg"
                        width={24}
                        height={24}
                        alt="edit"
                      />
                    </button>
                    <button
                      className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => deleteRencanaAnggaranPKM(row.id)}
                      disabled={isPending}
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
            {isOpenHasData ? (
              <FormRencanaAnggaranPKM onClose={() => setisOpenHasData(false)} />
            ) : (
              <tr>
                <td colSpan={4}>
                  <div className="my-2 flex">
                    <button
                      className="ml-auto flex gap-2 rounded bg-green px-4 py-2 text-white hover:bg-green/80"
                      onClick={() => setisOpenHasData(true)}
                    >
                      <Image
                        src="/icons/plus-circle-white.svg"
                        width={24}
                        height={24}
                        alt="plus"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            <tr className="border-t border-primary">
              <td className="hidden lg:table-cell"></td>
              <td className="p-3">Total</td>
              <td colSpan="2" className="p-3">
                {convertToRupiah(
                  data?.data.reduce((total, item) => {
                    return total + item.biaya;
                  }, 0),
                )}
              </td>
            </tr>
          </>
        ) : (
          <>
            {isOpenEmptyData ? (
              <FormRencanaAnggaranPKM
                onClose={() => setisOpenEmptyData(false)}
              />
            ) : (
              <>
                <tr>
                  <td className="p-2 text-center" colSpan={4}>
                    Tidak ada data
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <div className="flex">
                      <button
                        className="ml-auto flex gap-2 rounded bg-green px-4 py-2 text-white hover:bg-green/80"
                        onClick={() => setisOpenEmptyData(true)}
                      >
                        <Image
                          src="/icons/plus-circle-white.svg"
                          width={24}
                          height={24}
                          alt="plus"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            )}
          </>
        )}
      </tbody>
    </table>
  );
};
