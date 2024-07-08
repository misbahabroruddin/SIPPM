"use client";
import { useState } from "react";
import FileSaver from "file-saver";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableRincianBiaya } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { ButtonExport } from "@/components/button/button-export";
import { useImportRincianBiaya } from "@/handlers/data-referensi/rincian-biaya/administrator/import-rincian-biaya";
import { useExportRincianBiaya } from "@/handlers/data-referensi/rincian-biaya/administrator/export-rincian-biaya";
import { useQueryListingRincianBiaya } from "@/handlers/data-referensi/rincian-biaya/administrator/query-get-all-rincian-biaya";
import { ModalTrashRincianBiaya } from "./modal-trash-rincian-biaya";
import { ModalTambahRincianBiaya } from "./modal-tambah-rincian-biaya";

export const TableRincianBiaya = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useColumnTableRincianBiaya();
  const { mutateAsync: onImportFile } = useImportRincianBiaya();

  const {
    data: dataRincianBiaya,
    refetch,
    isLoading: isLoadingRincianBiaya,
  } = useExportRincianBiaya();

  const handleExport = async () => {
    await refetch();
    if (dataRincianBiaya) {
      FileSaver.saveAs(dataRincianBiaya, "rincian-biaya.xlsx");
    }
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

  const { data, isLoading } = useQueryListingRincianBiaya(
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
          <ModalTrashRincianBiaya />
          <InputFileImport onChange={handleImport} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingRincianBiaya}
          />
          <ModalTambahRincianBiaya />
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
