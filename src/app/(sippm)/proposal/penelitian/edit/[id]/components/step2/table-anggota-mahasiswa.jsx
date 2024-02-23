"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";

import { ModalDetailAnggotaMahasiswa } from "./modal-detail-anggota-mahasiswa";
import { useDeleteAnggotaPenelitian } from "@/handlers/penelitian/anggota/delete-anggota-penelitian";

export const TableAnggotaMahasiswa = ({ data }) => {
  const { onDeleteAnggotaMahasiswaPenelitian, isLoadingMahasiswa } =
    useDeleteAnggotaPenelitian();

  const header = [
    "No",
    "Nama Lengkap",
    "Perguruan Tinggi",
    "NIM",
    "Program Studi",
    "Email",
    "Action",
  ];

  return (
    <table className='w-full min-w-max table-auto text-left rounded-t-lg overflow-hidden !font-poppins'>
      <thead className='rounded-lg'>
        <tr>
          {header.map((head) => (
            <th key={head} className='  bg-primary p-4'>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-semibold leading-none text-white font-poppins text-center'
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
              <tr key={row.id} className='even:bg-sky text-base'>
                <td className='p-3'>
                  <Typography
                    color='blue-gray'
                    className='font-normal text-center'
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className='p-3 '>
                  <Typography color='blue-gray' className='font-normal'>
                    {row.anggota.nama_lengkap}
                  </Typography>
                </td>
                <td className='p-3'>
                  <Typography color='blue-gray' className='font-normal'>
                    {row.anggota.perguruan_tinggi}
                  </Typography>
                </td>
                <td className='p-3 text-center'>
                  <Typography color='blue-gray' className='font-normal'>
                    {row.anggota.nidn_or_nidk_nim}
                  </Typography>
                </td>
                <td className='p-3 text-center'>
                  <Typography color='blue-gray' className='font-normal'>
                    {row.anggota.program_studi?.nama || "-"}
                  </Typography>
                </td>
                <td className='p-3 text-center'>
                  <Typography color='blue-gray' className='font-normal'>
                    {row.anggota.email || "-"}
                  </Typography>
                </td>
                <td className='flex gap-1 justify-center items-center text-center py-3'>
                  <ModalDetailAnggotaMahasiswa id={row.id} />
                  <button
                    className='rounded-lg disabled:cursor-not-allowed disabled:opacity-50'
                    onClick={() => onDeleteAnggotaMahasiswaPenelitian(row.id)}
                    disabled={isLoadingMahasiswa}
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
          <tr className='even:bg-sky text-base'>
            <td className='p-3' colSpan={7}>
              <Typography color='blue-gray' className='font-normal text-center'>
                Tidak ada anggota
              </Typography>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
