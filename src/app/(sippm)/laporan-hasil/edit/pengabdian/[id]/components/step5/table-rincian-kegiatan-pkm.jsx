"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

import { ModalEditRincianKegiatanPKM } from "./modal-edit-rincian-kegiatan-pkm";
import { converDateRange } from "@/lib/utils/convertDate";
import { useDeleteRincianKegiatanLaporanHasilPKM } from "@/handlers/dosen/laporan-hasil/pengabdian/rincian-kegiatan/delete-rincian-kegiatan-pkm";

export const TableRincianKegiatan = ({ data }) => {
  const TABLE_HEAD = ["No", "Kegiatan", "Waktu", "Action"];

  const router = useRouter();

  const { deleteRincianKegiatan, isPending } =
    useDeleteRincianKegiatanLaporanHasilPKM(router);

  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left">
      <thead className="rounded-lg">
        <tr>
          {TABLE_HEAD.map((head) => (
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
          data?.data.map((row, index) => {
            return (
              <tr key={index} className="text-base even:bg-sky">
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
                    {row.kegiatan}
                  </Typography>
                </td>
                <td className="w-52 p-3 xl:w-[550px]">
                  <Typography color="blue-gray" className="font-normal">
                    {converDateRange(row?.waktu)}
                  </Typography>
                </td>
                <td className="flex w-36 items-center justify-center gap-1 py-3 text-center">
                  <ModalEditRincianKegiatanPKM id={row?.id} />
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
