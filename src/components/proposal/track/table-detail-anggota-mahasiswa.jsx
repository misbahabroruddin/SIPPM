"use client";

import { Typography } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

export const TableDetailAnggotaMahasiswa = ({ data }) => {
  const header = [
    "No",
    "Nama Lengkap",
    "Perguruan Tinggi",
    "NIM",
    "Program Studi",
    "Email",
  ];

  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left !font-poppins">
      <thead className="rounded-lg">
        <tr>
          {header.map((head, index) => (
            <th
              key={head}
              className={twMerge(
                "bg-primary px-1 py-3 lg:p-4",
                index === 3 && "hidden lg:table-cell",
                index === 4 && "hidden lg:table-cell",
                index === 5 && "hidden lg:table-cell",
              )}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="text-center font-poppins text-sm font-[500] leading-none text-white lg:text-lg lg:font-semibold"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.data?.anggota_proposals?.length ? (
          data?.data?.anggota_proposals
            ?.filter((anggota) => anggota.jenis_anggota === "Mahasiswa")
            .map((row, index) => {
              return (
                <tr key={row.id} className="text-base even:bg-sky">
                  <td className="p-2 lg:p-3">
                    <Typography
                      color="blue-gray"
                      className="text-center font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-2 lg:p-3 ">
                    <Typography color="blue-gray" className="font-normal">
                      {row.anggota.nama_lengkap}
                    </Typography>
                  </td>
                  <td className="p-2 lg:p-3 ">
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
                      {row.anggota.program_studi?.nama}
                    </Typography>
                  </td>
                  <td className="hidden p-2 lg:table-cell lg:p-3">
                    <Typography color="blue-gray" className="font-normal">
                      {row.anggota.email || "-"}
                    </Typography>
                  </td>
                </tr>
              );
            })
        ) : (
          <tr className="text-base even:bg-sky">
            <td className="p-2 lg:p-3" colSpan={7}>
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
