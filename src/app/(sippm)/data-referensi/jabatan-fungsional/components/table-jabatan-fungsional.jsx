"use client";
import { useEffect, useRef, useState } from "react";
import FileSaver from "file-saver";
import { useDebouncedCallback } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";

import DataTable from "@/components/data-table/table";
import { useQueryListingJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/query-get-all-jabatan-fungsional";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { ModalTambahJabatanFungsional } from "./modal-tambah-jabatan-fungsional";
import { useImportJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/import-jabatan-fungsional";
import { useColumnTableJabatanFungsional } from "./column-table";
import { ModalTrashJabatanFungsional } from "./modal-trash-jabatan-fungsional";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { ButtonExport } from "@/components/button/button-export";
import { useExportJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/export-jabatan-fungsional";

export const TableJabatanFungsional = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();

  const inputFile = useRef(null);

  const columns = useColumnTableJabatanFungsional();
  const { mutateAsync: onImportFile, isSuccess: isSuccessImport } =
    useImportJabatanFungsional();

  const {
    data: dataJabatanFungsional,
    refetch,
    isLoading: isLoadingJabatanFungsional,
    isSuccess: isSuccessExport,
  } = useExportJabatanFungsional();

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

  const { data, isLoading } = useQueryListingJabatanFungsional(
    search,
    pagination.pageIndex + 1,
  );

  useEffect(() => {
    if (isSuccessExport) {
      FileSaver.saveAs(dataJabatanFungsional, "jabatan-fungsional.xlsx");
      queryClient.removeQueries({
        queryKey: ["exportJabatanFungsional"],
      });
    }
  }, [dataJabatanFungsional]);

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
          <ModalTrashJabatanFungsional />
          <InputFileImport onChange={handleImport} ref={inputFile} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingJabatanFungsional}
          />
          <ModalTambahJabatanFungsional />
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
