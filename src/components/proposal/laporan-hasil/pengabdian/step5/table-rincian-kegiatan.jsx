"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

import { convertDate } from "@/lib/utils/convertDate";
import { FormRincianKegiatanPKM } from "./form-rincian-kegiatan";
import { useDeleteRincianKegiatanProposal } from "@/handlers/dosen/proposal/rincian-kegiatan/delete-rincian-kegiatan";

export const TableRincianKegiatan = ({ data }) => {
  const TABLE_HEAD = ["No", "Kegiatan", "Waktu", "Action"];

  const [isOpenEmptyData, setIsOpenEmptyData] = useState(false);
  const [isOpenHasData, setisOpenHasData] = useState(false);
  const [editingDataId, setEditingDataId] = useState();

  const { mutateAsync: deleteRincianKegiatan, isPending } =
    useDeleteRincianKegiatanProposal();

  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left">
      <thead className="rounded-lg">
        <tr>
          {TABLE_HEAD.map((head, index) => (
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
          <>
            {data?.data.map((row, index) => {
              return editingDataId === row.id ? (
                <FormRincianKegiatanPKM
                  id={row.id}
                  onClose={() => setEditingDataId()}
                  key={row.id}
                />
              ) : (
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
                      {`${convertDate(row.tanggal_awal, " ")} - ${convertDate(row.tanggal_akhir, " ")}`}
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
                      onClick={() => deleteRincianKegiatan(row?.id)}
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
              <FormRincianKegiatanPKM onClose={() => setisOpenHasData(false)} />
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
          </>
        ) : (
          <>
            {isOpenEmptyData ? (
              <FormRincianKegiatanPKM
                onClose={() => setIsOpenEmptyData(false)}
              />
            ) : (
              <>
                <tr>
                  <td className="p-4 text-center" colSpan={4}>
                    Tidak ada data
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <div className="flex">
                      <button
                        className="ml-auto flex gap-2 rounded bg-green px-4 py-2 text-white hover:bg-green/80"
                        onClick={() => setIsOpenEmptyData(true)}
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
