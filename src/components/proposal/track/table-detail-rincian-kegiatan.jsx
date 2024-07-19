"use client";

import { converDateRange, convertDate } from "@/lib/utils/convertDate";
import { Typography } from "@material-tailwind/react";

export const TableDetailRincianKegiatan = ({ data }) => {
  const header = ["No", "Kegiatan", "Waktu"];

  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left">
      <thead className="rounded-lg">
        <tr>
          {header.map((head) => (
            <th
              key={head}
              className="bg-primary px-1 py-3 text-sm last:text-center lg:p-4 lg:text-base"
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
        {data?.data?.length ? (
          data?.data?.map((row, index) => (
            <tr key={row.id} className="text-base even:bg-sky">
              <td className="w-8 p-2 lg:p-3">
                <Typography
                  color="blue-gray"
                  className="text-center text-sm font-normal lg:text-base"
                >
                  {index + 1}
                </Typography>
              </td>
              <td className="w-[50px] p-2 lg:w-fit lg:p-3">
                <Typography
                  color="blue-gray"
                  className="text-sm font-normal lg:text-base"
                >
                  {row.kegiatan}
                </Typography>
              </td>
              <td className="w-[100px] p-2 lg:w-fit lg:p-3">
                <Typography
                  color="blue-gray"
                  className="text-sm font-normal lg:text-base"
                >
                  {`${convertDate(row.tanggal_awal, " ")} - ${convertDate(row.tanggal_akhir, " ")}`}
                  {/* {converDateRange(row.waktu)} */}
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
