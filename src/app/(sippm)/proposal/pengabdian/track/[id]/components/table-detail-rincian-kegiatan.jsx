"use client";

import { converDateRange } from "@/lib/utils/convertDate";
import { Typography } from "@material-tailwind/react";

export const TableDetailRincianKegiatan = ({ data }) => {
  const header = ["No", "Kegiatan", "Waktu"];

  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left">
      <thead className="rounded-lg">
        <tr>
          {header.map((head) => (
            <th key={head} className="  bg-primary p-4 last:text-center">
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
        {data?.data?.rincian_kegiatans?.length ? (
          data?.data?.rincian_kegiatans?.map((row, index) => (
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
                  {row.kegiatan}
                </Typography>
              </td>
              <td className="p-3 text-center">
                <Typography color="blue-gray" className="font-normal">
                  {converDateRange(row.waktu)}
                </Typography>
              </td>
            </tr>
          ))
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
