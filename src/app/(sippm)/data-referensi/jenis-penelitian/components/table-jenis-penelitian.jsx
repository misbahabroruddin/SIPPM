"use client";
import { useDebouncedCallback } from "use-debounce";
import FileSaver from "file-saver";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableJenisPenelitian } from "./column-table";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { useImportJenisPenelitian } from "@/handlers/data-referensi/jenis-penelitian/administrator/import-jenis-penelitian";
import { useQueryListingJenisPenelitian } from "@/handlers/data-referensi/jenis-penelitian/administrator/query-get-all-jenis-penelitian";
import { ModalTrashJenisPenelitian } from "./modal-trash-jenis-penelitian";
import { ModalTambahJenisPenelitian } from "./modal-tambah-jenis-penelitian";
import { ButtonExport } from "@/components/button/button-export";
import { useExportJenisPenelitian } from "@/handlers/data-referensi/jenis-penelitian/administrator/export-jenis-penelitian";

export const TableJenisPenelitian = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();

  const inputFile = useRef(null);

  const columns = useColumnTableJenisPenelitian();
  const { mutateAsync: onImportFile, isSuccess: isSuccessImport } =
    useImportJenisPenelitian();

  const {
    data: dataJenisPenelitian,
    refetch,
    isLoading: isLoadingJenisPenelitian,
    isSuccess: isSuccessExport,
  } = useExportJenisPenelitian();

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

  const { data, isLoading } = useQueryListingJenisPenelitian(
    search,
    pagination.pageIndex + 1,
  );

  useEffect(() => {
    if (isSuccessExport) {
      FileSaver.saveAs(dataJenisPenelitian, "jenis-penelitian.xlsx");
      queryClient.removeQueries({
        queryKey: ["exportJenisPenelitian"],
      });
    }
  }, [isSuccessExport]);

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
          <ModalTrashJenisPenelitian />
          <InputFileImport onChange={handleImport} ref={inputFile} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingJenisPenelitian}
          />
          <ModalTambahJenisPenelitian />
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
