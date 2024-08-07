"use client";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import FileSaver from "file-saver";

import DataTable from "@/components/data-table/table";
import { SearchInput } from "@/components/input/search-input";
import { InputFileImport } from "@/components/input/input-file-import";
import { useColumnTableBidangIlmu } from "./column-table";
import { useQueryListingBidangIlmu } from "@/handlers/data-referensi/bidang-ilmu/administrator/query-get-all-bidang-ilmu";
import { useImportBidangIlmu } from "@/handlers/data-referensi/bidang-ilmu/administrator/import-bidang-ilmu";
import { ModalTambahBidangIlmu } from "./modal-tambah-bidang-ilmu";
import { ModalTrashBidangIlmu } from "./modal-trash-bidang-ilmu";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import { useExportBidangIlmu } from "@/handlers/data-referensi/bidang-ilmu/administrator/export-bidang-ilmu";
import { ButtonExport } from "@/components/button/button-export";

export const TableBidangIlmu = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputFile = useRef(null);

  const columns = useColumnTableBidangIlmu();
  const { mutateAsync: onImportFile, isSuccess } = useImportBidangIlmu();

  const {
    data: dataBidangIlmu,
    isLoading: isLoadingBidangIlmu,
    isSuccess: isSuccessExport,
    refetch,
  } = useExportBidangIlmu();

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

  const { data, isLoading } = useQueryListingBidangIlmu(
    search,
    pagination.pageIndex + 1,
  );

  useEffect(() => {
    if (isSuccessExport) {
      FileSaver.saveAs(dataBidangIlmu, "bidang-ilmu.xlsx");
    }
  }, [dataBidangIlmu]);

  useEffect(() => {
    if (isSuccess && inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "file";
    }
  }, [isSuccess]);

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
          <ModalTrashBidangIlmu />
          <InputFileImport onChange={handleImport} ref={inputFile} />
          <ButtonExport
            onClick={handleExport}
            isLoading={isLoadingBidangIlmu}
          />
          <ModalTambahBidangIlmu />
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
