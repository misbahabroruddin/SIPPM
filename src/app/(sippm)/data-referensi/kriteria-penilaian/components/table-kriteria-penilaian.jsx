"use client";
import { useState } from "react";
import FileSaver from "file-saver";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableKriteriaPenilaian } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { ButtonExport } from "@/components/button/button-export";
import { ModalTrashKriteriaPenilaian } from "./modal-trash-kriteria-penilaian";
import { ModalTambahKriteriaPenilaian } from "./modal-tambah-kriteria-penilaian";
import { useImportKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/import-kriteria-penilaian";
import { useExportKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/export-kriteria-penilaian";
import { useQueryListingKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/query-get-all-kriteria-penilaian";

export const TableKriteriaPenilaian = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useColumnTableKriteriaPenilaian();

  const { mutateAsync: onImportFile } = useImportKriteriaPenilaian();

  const {
    data: dataKriteriaPenilaian,
    refetch,
    isLoading: isLoadingKriteriaPenilaian,
  } = useExportKriteriaPenilaian();

  const handleExport = async () => {
    await refetch();
    if (dataKriteriaPenilaian) {
      FileSaver.saveAs(dataKriteriaPenilaian, "kriteria-penilaian.xlsx");
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

  const { data, isLoading } = useQueryListingKriteriaPenilaian(
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
          <ModalTrashKriteriaPenilaian />
          <InputFileImport onChange={handleImport} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingKriteriaPenilaian}
          />
          <ModalTambahKriteriaPenilaian />
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
