"use client";
import { useState } from "react";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableProgramStudi } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { ModalTrashProgramStudi } from "./modal-trash-program-studi";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { useImportProgramStudi } from "@/handlers/data-referensi/program-studi/administrator/import-program-studi";
import { useQueryListingProgramStudi } from "@/handlers/data-referensi/program-studi/administrator/query-get-all-program-studi";
import { ModalTambahProgramStudi } from "./modal-tambah-program-studi";
import FileSaver from "file-saver";
import { useExportProgramStudi } from "@/handlers/data-referensi/program-studi/administrator/export-program-studi";
import { ButtonExport } from "@/components/button/button-export";

export const TableProgramStudi = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useColumnTableProgramStudi();
  const { mutateAsync: onImportFile } = useImportProgramStudi();

  const {
    data: dataProgramStudi,
    refetch,
    isLoading: isLoadingProgramStudi,
  } = useExportProgramStudi();

  const handleExport = async () => {
    await refetch();
    FileSaver.saveAs(dataProgramStudi, "program-studi.xlsx");
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

  const { data, isLoading } = useQueryListingProgramStudi(
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
          <ModalTrashProgramStudi />
          <InputFileImport onChange={handleImport} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingProgramStudi}
          />
          <ModalTambahProgramStudi />
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
