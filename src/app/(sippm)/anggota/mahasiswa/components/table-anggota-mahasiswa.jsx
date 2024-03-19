"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { useColumnTableAnggotaMahasiswa } from "./column-table";
import { SearchInput } from "@/components/input/search-input";
import { SkeletonTableDataRefensi } from "@/components/skeleton/skeleton-table-data-refensi";
import DataTable from "@/components/data-table/table";
import { ModalTambahAnggotaMahasiswa } from "./modal-tambah-anggota-mahasiswa";
import { useQueryAdministratorAnggotaMahasiswa } from "@/handlers/anggota/administrator/query-get-all-anggota-mahasiswa";

export const TableAnggotaMahasiswa = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useColumnTableAnggotaMahasiswa();

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
  }, 1000);

  const { data, isLoading } = useQueryAdministratorAnggotaMahasiswa(
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
        <ModalTambahAnggotaMahasiswa />
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
