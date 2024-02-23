"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

import { ModalEditRincianKegiatanPKM } from "./modal-edit-rincian-kegiatan-pkm";
import { converDateRange } from "@/lib/utils/convertDate";
import { useDeleteRincianKegiatanPKM } from "@/handlers/pengabdian/rincian-kegiatan/delete-rincian-kegiatan-pkm";

export const TableRincianKegiatan = ({ data }) => {
  const TABLE_HEAD = ["No", "Kegiatan", "Waktu", "Action"];
  const router = useRouter();
  const { deleteRincianKegiatan, isPending } =
    useDeleteRincianKegiatanPKM(router);

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
                    {converDateRange(row?.waktu)}
                  </Typography>
                </td>
                <td className='flex gap-1 justify-center items-center text-center py-3 w-36'>
                  <ModalEditRincianKegiatanPKM id={row?.id} />
                  <button
                    className='rounded-lg disabled:cursor-not-allowed disabled:opacity-60'
                    onClick={() => deleteRincianKegiatan(row?.id)}
                    disabled={isPending}
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
