"use client";
import { useState } from "react";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableLuaranWajib } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { ModalTrashLuaranWajib } from "./modal-trash-luaran-wajib";
import { ModalTambahLuaranWajib } from "./modal-tambah-luaran-wajib";
import { useImportLuaranWajib } from "@/handlers/data-referensi/luaran-wajib/administrator/import-luaran-wajib";
import { useQueryListingLuaranWajib } from "@/handlers/data-referensi/luaran-wajib/administrator/query-get-all-luaran-wajib";
import { useExportLuaranWajib } from "@/handlers/data-referensi/luaran-wajib/administrator/export-luaran-wajib";
import FileSaver from "file-saver";
import { ButtonExport } from "@/components/button/button-export";

export const TableLuaranWajib = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useColumnTableLuaranWajib();
  const { mutateAsync: onImportFile } = useImportLuaranWajib();

  const { data: dataLuaranWajib, refetch } = useExportLuaranWajib();

  const handleExport = async () => {
    await refetch();
    FileSaver.saveAs(dataLuaranWajib, "luaran-wajib.xlsx");
  };

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

  const { data, isLoading } = useQueryListingLuaranWajib(
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
          <ModalTrashLuaranWajib />
          <InputFileImport onChange={handleImport} />
          <ButtonExport onClick={handleExport} />
          <ModalTambahLuaranWajib />
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
