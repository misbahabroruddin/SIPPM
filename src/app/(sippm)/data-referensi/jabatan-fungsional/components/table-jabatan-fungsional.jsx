"use client";
import { useState } from "react";

import DataTable from "@/components/data-table/table";
import { useQueryListingJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/query-get-all-jabatan-fungsional";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { ModalTambahJabatanFungsional } from "./modal-tambah-jabatan-fungsional";
import { useImportJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/import-jabatan-fungsional";
import { useColumnTableJabatanFungsional } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { ModalTrashJabatanFungsional } from "./modal-trash-jabatan-fungsional";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";

export const TableJabatanFungsional = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useColumnTableJabatanFungsional();
  const { mutateAsync: onImportFile } = useImportJabatanFungsional();

  const handleImport = async (e) => {
    const file = e.target.files[0];
    await onImportFile(file);
  };

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 1000);

  const { data, isLoading } = useQueryListingJabatanFungsional(
    search,
    pagination.pageIndex + 1,
  );

  if (isLoading) return <SkeletonTableDataRefensi />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex w-[512px] gap-4">
          <SearchInput
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={search}
          />
        </div>
        <div className="flex gap-2">
          <ModalTrashJabatanFungsional />
          <InputFileImport onChange={handleImport} />
          <ModalTambahJabatanFungsional />
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
