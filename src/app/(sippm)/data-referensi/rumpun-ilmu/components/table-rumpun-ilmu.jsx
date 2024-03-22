"use client";
import { useState } from "react";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableRumpunIlmu } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { ModalTrashRumpunIlmu } from "./modal-trash-rumpun-ilmu";
import { ModalTambahRumpunIlmu } from "./modal-tambah-rumpun-ilmu";
import { useImportRumpunIlmu } from "@/handlers/data-referensi/rumpun-ilmu/administrator/import-rumpun-ilmu";
import { useQueryListingRumpunIlmu } from "@/handlers/data-referensi/rumpun-ilmu/administrator/query-get-all-rumpun-ilmu";
import { useExportRumpunIlmu } from "@/handlers/data-referensi/rumpun-ilmu/administrator/export-rumpun-ilmu";
import { ButtonExport } from "@/components/button/button-export";
import FileSaver from "file-saver";

export const TableRumpunIlmu = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useColumnTableRumpunIlmu();
  const { mutateAsync: onImportFile } = useImportRumpunIlmu();

  const {
    data: dataRumpunIlmu,
    refetch,
    isLoading: isLoadingRumpunIlmu,
  } = useExportRumpunIlmu();

  const handleExport = async () => {
    await refetch();
    FileSaver.saveAs(dataRumpunIlmu, "rumpun-ilmu.xlsx");
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

  const { data, isLoading } = useQueryListingRumpunIlmu(
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
          <ModalTrashRumpunIlmu />
          <InputFileImport onChange={handleImport} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingRumpunIlmu}
          />
          <ModalTambahRumpunIlmu />
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
