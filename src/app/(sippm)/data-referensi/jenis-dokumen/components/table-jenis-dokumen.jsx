"use client";
import { useEffect, useRef, useState } from "react";
import FileSaver from "file-saver";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableJenisDokumen } from "./column-table";
import { useDebouncedCallback } from "use-debounce";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { ButtonExport } from "@/components/button/button-export";
import { ModalTrashJenisDokumen } from "./modal-trash-jenis-dokumen";
import { ModalTambahJenisDokumen } from "./modal-tambah-jenis-dokumen";
import { useImportJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/import-jenis-dokumen";
import { useExportJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/export-jenis-dokumen";
import { useQueryListingJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/query-get-all-jenis-dokumen";

export const TableJenisDokumen = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const inputFile = useRef(null);

  const columns = useColumnTableJenisDokumen();
  const { mutateAsync: onImportFile, isSuccess: isSuccessImport } =
    useImportJenisDokumen();

  const {
    data: dataJenisDokumen,
    refetch,
    isLoading: isLoadingJenisDokumen,
    isSuccess: isSuccessExport,
  } = useExportJenisDokumen();

  const handleExport = async () => {
    await refetch();
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

  const { data, isLoading } = useQueryListingJenisDokumen(
    search,
    pagination.pageIndex + 1,
  );

  useEffect(() => {
    if (isSuccessExport) {
      FileSaver.saveAs(dataJenisDokumen, "jenis-dokumen.xlsx");
    }
  }, [dataJenisDokumen]);

  useEffect(() => {
    if (isSuccessImport && inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "file";
    }
  }, [isSuccessImport]);

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
          <ModalTrashJenisDokumen />
          <InputFileImport onChange={handleImport} ref={inputFile} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingJenisDokumen}
          />
          <ModalTambahJenisDokumen />
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
