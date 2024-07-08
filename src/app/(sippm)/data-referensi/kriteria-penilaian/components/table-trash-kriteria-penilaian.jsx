"use client";
import { useState } from "react";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { useDebouncedCallback } from "use-debounce";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { useColumnTableTrashKriteriaPenilaian } from "./column-table";
import { useQueryTrashListingKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/query-get-all-trash-kriteria-penilaian";

export const TableTrashKriteriaPenilaian = ({ onClose }) => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useColumnTableTrashKriteriaPenilaian(onClose);

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 1000);

  const { data, isLoading } = useQueryTrashListingKriteriaPenilaian(
    search,
    pagination.pageIndex + 1,
  );

  if (isLoading) return <SkeletonTableDataRefensi />;

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
