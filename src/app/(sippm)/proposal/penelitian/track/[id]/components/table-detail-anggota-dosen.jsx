"use client";

import { Typography } from "@material-tailwind/react";

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
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left !font-poppins">
      <thead className="rounded-lg">
        <tr>
          {header.map((head) => (
            <th key={head} className="  bg-primary p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="text-center font-poppins font-semibold leading-none text-white"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.data?.anggota_proposals.length ? (
          data?.data?.anggota_proposals
            ?.filter((anggota) => anggota.jenis_anggota === "Dosen")
            .map((row, index) => {
              return (
                <tr className="text-base even:bg-sky">
                  <td className="p-3">
                    <Typography
                      color="blue-gray"
                      className="text-center font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-3 ">
                    <Typography color="blue-gray" className="font-normal">
                      {row.anggota.nama_lengkap}
                    </Typography>
                  </td>
                  <td className="p-3 ">
                    <Typography color="blue-gray" className="font-normal">
                      {row.anggota.perguruan_tinggi}
                    </Typography>
                  </td>
                  <td className="p-3 ">
                    <Typography color="blue-gray" className="font-normal">
                      {row.anggota.nidn_or_nidk_or_nim}
                    </Typography>
                  </td>
                  <td className="p-3 ">
                    <Typography color="blue-gray" className="font-normal">
                      {row.anggota.program_studi?.nama}
                    </Typography>
                  </td>
                  <td className="p-3 ">
                    <Typography color="blue-gray" className="font-normal">
                      {row.anggota.jabatan_fungsional?.nama || "-"}
                    </Typography>
                  </td>
                </tr>
              );
            })
        ) : (
          <tr className="text-base even:bg-sky">
            <td className="p-3" colSpan={7}>
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
