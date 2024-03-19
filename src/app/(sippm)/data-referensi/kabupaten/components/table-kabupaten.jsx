"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { useColumnTableKabupaten } from "./column-table";
import { useQueryListingKabupaten } from "@/handlers/data-referensi/kabupaten/administator/query-get-all-kabupaten";
import { ModalTambahKabupaten } from "./modal-tambah-kabupaten";
import { useImportKabupaten } from "@/handlers/data-referensi/kabupaten/administator/import-kabupaten";
import { ModalTrashKabupaten } from "./modal-trash-kabupaten";
import { InputFileImport } from "@/components/input/input-file-import";

export const TableKabupaten = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useColumnTableKabupaten();
  const { mutateAsync: onImportFile } = useImportKabupaten();

  const handleImport = async (e) => {
    const file = e.target.files[0];
    await onImportFile(file);
  };

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
  }, 1000);

  const { data, isLoading } = useQueryListingKabupaten(
    search,
    pagination.pageIndex + 1,
  );

  if (isLoading) return <SkeletonTableDataRefensi />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <SearchInput
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={search}
          />
        </div>
        <div className="flex gap-2">
          <ModalTrashKabupaten />
          <InputFileImport onChange={handleImport} />
          <ModalTambahKabupaten />
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
