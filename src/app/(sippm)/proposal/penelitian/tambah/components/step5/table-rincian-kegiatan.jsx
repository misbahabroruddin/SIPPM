"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";

import { ModalEditRincianKegiatan } from "./modal-edit-rincian-kegiatan";
import { converDateRange } from "@/lib/utils/convertDate";
import { useDeleteRincianKegiatanPenelitian } from "@/handlers/penelitian/rincian-kegiatan/delete-rincian-kegiatan";

export const TableRincianKegiatan = ({ data }) => {
  const { deleteRincianKegiatanPenelitian, isLoadingDelete } =
    useDeleteRincianKegiatanPenelitian();
  const TABLE_HEAD = ["No", "Kegiatan", "Rentang Waktu", "Action"];

  return (
    <table className='w-full min-w-max text-left table-auto rounded-t-lg overflow-hidden'>
      <thead className='rounded-lg'>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className='  bg-primary p-4 last:w-36 last:text-center'
            >
              <Typography
                variant='small'
                color='blue-gray'
                className='font-semibold leading-none text-white font-poppins'
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
              <tr key={index} className='even:bg-sky text-base'>
                <td className='p-3 w-8'>
                  <Typography
                    color='blue-gray'
                    className='font-normal text-center'
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className='p-3 '>
                  <Typography color='blue-gray' className='font-normal'>
                    {row.kegiatan}
                  </Typography>
                </td>
                <td className='p-3 w-52 xl:w-[550px]'>
                  <Typography color='blue-gray' className='font-normal'>
                    {converDateRange(row.waktu)}
                  </Typography>
                </td>
                <td className='flex gap-1 justify-center items-center text-center py-3 w-36'>
                  <ModalEditRincianKegiatan id={row?.id} />
                  <button
                    className='rounded-lg disabled:cursor-not-allowed disabled:opacity-60'
                    onClick={() => deleteRincianKegiatanPenelitian(row?.id)}
                    disabled={isLoadingDelete}
                  >
                    <Image
                      src='/icons/delete.svg'
                      width={24}
                      height={24}
                      alt='delete'
                    />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td className='p-4 text-center' colSpan={4}>
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
