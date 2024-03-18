"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
// import { InputFileImport } from "@/components/input/input-file-import";
// import { useImportBidangIlmu } from "@/handlers/data-referensi/bidang-ilmu/administrator/import-bidang-ilmu";
// import { ModalTrashBidangIlmu } from "./modal-trash-bidang-ilmu";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { useColumnTableKabupaten } from "./column-table";
import { useQueryListingKabupaten } from "@/handlers/data-referensi/kabupaten/administator/query-get-all-kabupaten";
import { ModalTambahKabupaten } from "./modal-tambah-kabupaten";

export const TableKabupaten = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useColumnTableKabupaten();
  // const { mutateAsync: onImportFile } = useImportBidangIlmu();

  // const handleImport = async (e) => {
  //   const file = e.target.files[0];
  //   await onImportFile(file);
  // };

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
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
          {/* <ModalTrashBidangIlmu /> */}
          {/* <InputFileImport onChange={handleImport} /> */}
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
