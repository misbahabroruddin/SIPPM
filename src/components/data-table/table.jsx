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

  const paginationButtons = [];
  for (let i = 0; i < table?.getPageCount(); i++) {
    paginationButtons.push(
      <button
        className={twMerge(
          "border bg-white px-4 py-2 text-primary",
          currentPage === i &&
            "border border-blue-primary bg-blue-primary text-white",
        )}
        key={i}
        onClick={() => {
          table.setPageIndex(i);
        }}
      >
        {i + 1}
      </button>,
    );
  }

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
                      className=" bg-primary p-4"
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
                  <td
                    key={index}
                    className="p-3"
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
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
        <div className="flex">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={pagination.pageIndex === 0}
            className="rounded-lg rounded-r-none border bg-white p-2 text-primary disabled:opacity-70"
          >
            Sebelumnya
          </button>
          {paginationButtons.map((u) => u)}
          <button
            onClick={() => table.nextPage()}
            disabled={pagination.pageIndex === table.getPageCount() - 1}
            className="rounded-lg rounded-l-none border bg-white p-2 text-primary disabled:opacity-70"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
