"use client";

import { convertToRupiah } from "@/lib/utils/convertToRupiah";
import { Typography } from "@material-tailwind/react";

export const TableDetailRencanaAnggaran = ({ data }) => {
  const header = ["No", "Rincian", "Biaya"];

  return (
    <table className="w-full min-w-max table-auto overflow-hidden rounded-t-lg text-left">
      <thead className="rounded-lg">
        <tr>
          {header.map((head) => (
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
        {data?.data?.rencana_anggaran_proposals.length ? (
          <>
            {data?.data?.rencana_anggaran_proposals.map((row, index) => (
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
                    {row.rincian}
                  </Typography>
                </td>
                <td className="w-52 p-3 xl:w-[550px]">
                  <Typography color="blue-gray" className="font-normal">
                    {convertToRupiah(row.biaya)}
                  </Typography>
                </td>
              </tr>
            ))}
            <tr className="border-t border-primary">
              <td></td>
              <td colSpan={1} className="p-3">
                Total
              </td>
              <td colSpan={2} className="p-3">
                {convertToRupiah(
                  data?.data?.rencana_anggaran_proposals.reduce(
                    (total, item) => {
                      return total + item.biaya;
                    },
                    0,
                  ),
                )}
              </td>
            </tr>
          </>
        ) : (
          <tr>
            <td className="p-4 text-center" colSpan={3}>
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
