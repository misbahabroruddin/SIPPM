"use client";

import React from "react";
import ReactPaginate from "react-paginate";

export function Pagination({ onPageChange, pageCount, perPage, pageOffset }) {
  return (
    <div className="ml-auto flex items-center gap-4">
      <ReactPaginate
        breakLabel={<span className="px-4 text-blue-primary">...</span>}
        nextLabel={<span className="mx-2 text-blue-primary">Selanjutnya</span>}
        previousLabel={
          <span className="mx-2 text-blue-primary">Sebelumnya</span>
        }
        onPageChange={onPageChange}
        pageRangeDisplayed={perPage}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center border border-blue-09 rounded-lg"
        pageClassName="px-4 py-2 border border-y-0 border-blue-09 text-blue-04"
        activeClassName="bg-primary !text-white"
        forcePage={pageOffset}
        marginPagesDisplayed={3}
        disableInitialCallback={true}
      />
    </div>
  );
}
