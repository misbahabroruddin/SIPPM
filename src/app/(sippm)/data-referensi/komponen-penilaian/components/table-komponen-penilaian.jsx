"use client";
import { useState } from "react";
import FileSaver from "file-saver";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableKomponenPenilaian } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { ButtonExport } from "@/components/button/button-export";
import { ModalTrashKomponenPenilaian } from "./modal-trash-kriteria-penilaian";
import { ModalTambahKomponenPenilaian } from "./modal-tambah-komponen-penilaian";
import { useImportKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/import-komponen-penilaian";
import { useExportKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/export-komponen-penilaian";
import { useQueryListingKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/query-get-all-komponen-penilaian";

export const TableKomponenPenilaian = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useColumnTableKomponenPenilaian();

  const { mutateAsync: onImportFile } = useImportKomponenPenilaian();

  const {
    data: dataKomponenPenilaian,
    refetch,
    isLoading: isLoadingKomponenPenilaian,
  } = useExportKomponenPenilaian();

  const handleExport = async () => {
    await refetch();
    if (dataKomponenPenilaian) {
      FileSaver.saveAs(dataKomponenPenilaian, "komponen-penilaian.xlsx");
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

  const { data, isLoading } = useQueryListingKomponenPenilaian(
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
          <ModalTrashKomponenPenilaian />
          <InputFileImport onChange={handleImport} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingKomponenPenilaian}
          />
          <ModalTambahKomponenPenilaian />
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
