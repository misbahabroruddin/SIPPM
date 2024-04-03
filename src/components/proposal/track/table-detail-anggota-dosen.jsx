"use client";

import { Typography } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

export const TableDetailAnggotaDosen = ({ data }) => {
  const header = [
    "No",
    "Nama Lengkap",
    "Perguruan Tinggi",
    "NIDN/NIDK",
    "Bidang Ilmu",
    "Jabatan Fungsional",
  ];

  return (
    <table className="w-full  table-auto overflow-hidden rounded-t-lg text-left !font-poppins">
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
        {data?.data?.anggotas?.length ? (
          data?.data?.anggotas
            ?.filter((anggota) => anggota.jenis_anggota === "Dosen")
            .map((row, index) => {
              return (
                <tr key={row.id} className="text-base even:bg-sky">
                  <td className="p-2 lg:p-3">
                    <Typography
                      color="blue-gray"
                      className="text-center text-sm font-normal lg:text-base"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="w-40 p-2 sm:w-fit lg:p-3">
                    <Typography
                      color="blue-gray"
                      className="text-sm font-normal lg:text-base"
                    >
                      {row.anggota.nama_lengkap}
                    </Typography>
                  </td>
                  <td className="w-32 p-2 sm:w-fit lg:p-3">
                    <Typography
                      color="blue-gray"
                      className="text-sm font-normal lg:text-base"
                    >
                      {row.anggota.perguruan_tinggi}
                    </Typography>
                  </td>
                  <td className="hidden p-2 lg:table-cell lg:p-3">
                    <Typography
                      color="blue-gray"
                      className="text-sm font-normal lg:text-base"
                    >
                      {row.anggota.nidn_or_nidk_or_nim}
                    </Typography>
                  </td>
                  <td className="hidden p-2 lg:table-cell lg:p-3">
                    <Typography
                      color="blue-gray"
                      className="text-sm font-normal lg:text-base"
                    >
                      {row.anggota.program_studi?.nama}
                    </Typography>
                  </td>
                  <td className="hidden p-2 lg:table-cell lg:p-3">
                    <Typography
                      color="blue-gray"
                      className="text-sm font-normal lg:text-base"
                    >
                      {row.anggota.jabatan_fungsional?.nama || "-"}
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
