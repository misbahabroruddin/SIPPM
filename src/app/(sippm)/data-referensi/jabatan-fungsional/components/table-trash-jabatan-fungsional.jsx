"use client";
import { useState } from "react";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { useColumnTableTrashJabatanFungsional } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { useQueryTrashListingJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/query-get-all-trash-jabatan-fungsional";

export const TableTrashJabatanFungsional = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useColumnTableTrashJabatanFungsional(onClose);

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 1000);

  const { data, isLoading } = useQueryTrashListingJabatanFungsional(
    search,
    pagination.pageIndex + 1,
  );

  if (isLoading) return <p>Loading.....</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex max-w-[252px] gap-4">
          <SearchInput
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={search}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        total={data?.total}
        pageCount={data?.last_page}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};
