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
          <>
            {data?.data?.map((row, index) => (
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
                    {row.rincian_biaya.rincian}
                  </Typography>
                </td>
                <td className="w-[100px] p-3 md:w-52 xl:w-[550px]">
                  <Typography
                    color="blue-gray"
                    className="text-sm font-normal lg:text-base"
                  >
                    {convertToRupiah(row.biaya)}
                  </Typography>
                </td>
              </tr>
            ))}
            <tr className="border-t border-primary">
              <td></td>
              <td colSpan={1} className="p-3 text-sm lg:text-base">
                Total
              </td>
              <td colSpan={2} className="p-3 text-sm lg:text-base">
                {convertToRupiah(
                  data?.data?.reduce((total, item) => {
                    return total + item.biaya;
                  }, 0),
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
