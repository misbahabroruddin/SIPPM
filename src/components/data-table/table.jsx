"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  s,
} from "@tanstack/react-table";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Pagination } from "../pagination";

const DataTable = ({
  columns,
  data,
  total,
  pageCount,
  pagination,
  setPagination,
}) => {
  const table = useReactTable({
    data: data?.data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: total,
    pageCount: pageCount || 0,
    manualPagination: true,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    enableColumnResizing: true,
    debugTable: true,
    getRowId: (originalRow, index) => originalRow?.id || index,
    autoResetPageIndex: false,
  });

  const currentPage = table.getState().pagination.pageIndex;

  const handlePageChange = (e) => {
    table.setPageIndex(e.selected);
  };

  return (
    <>
      <table className="w-full table-auto overflow-hidden rounded-t-lg text-left !font-poppins">
        <thead className="rounded-lg">
          {table?.getHeaderGroups().map((group, index) => {
            return (
              <tr key={`${group.id}-${index}`}>
                {group.headers.map((header, index) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      className="bg-primary px-6 py-4 last:text-center"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className:
                              "font-poppins font-semibold leading-none text-white",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table?.getRowModel().rows?.length ? (
            table?.getRowModel()?.rows.map((row) => (
              <tr key={row.id} className="text-base even:bg-sky">
                {row.getVisibleCells().map((cell, index) => (
                  <td key={index} className="px-6 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={columns.length} className="p-3">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-2 text-primary">
          <p>Data</p>
          <p>{data?.to}</p>
          <p>of</p>
          <p>{total}</p>
        </div>
        <Pagination
          perPage={pagination.pageSize}
          pageCount={pageCount}
          pageOffset={pagination.pageIndex}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default DataTable;