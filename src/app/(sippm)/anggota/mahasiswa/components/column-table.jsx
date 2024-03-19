"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Swal from "sweetalert2";

import { useAdministratorDeleteAnggota } from "@/handlers/anggota/administrator/delete-anggota";
import { ModalEditAnggotaMahasiswa } from "./modal-edit-anggota-mahasiswa";
import { ModalDetailAnggotaMahasiswa } from "./modal-detail-anggota-mahasiswa";

export const useColumnTableAnggotaMahasiswa = () => {
  const { mutateAsync, isPending } = useAdministratorDeleteAnggota();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),

    columnHelper.accessor("nama_lengkap", {
      cell: (info) => info.getValue(),
      header: () => <span>Nama Lengkap</span>,
      minSize: 10,
    }),

    columnHelper.accessor("perguruan_tinggi", {
      cell: (info) => info.getValue(),
      header: () => <span>Perguruan Tinggi</span>,
      minSize: 10,
    }),

    columnHelper.accessor("nidn_or_nidk_or_nim", {
      cell: (info) => info.getValue(),
      header: () => <span>NIM</span>,
      minSize: 10,
    }),

    columnHelper.accessor("program_studi.nama", {
      cell: (info) => info.getValue(),
      header: () => <span>Program Studi</span>,
      minSize: 10,
    }),

    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <ModalDetailAnggotaMahasiswa id={info.row.original.id} />
            <ModalEditAnggotaMahasiswa id={info.row.original.id} />
            <button
              className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => {
                Swal.fire({
                  title: "Anda yakin?",
                  text: " Anda tidak akan dapat mengembalikan ini!",
                  icon: "warning",
                  dangerMode: true,
                  showCancelButton: true,
                  confirmButtonText: "Ya, hapus",
                  cancelButtonText: "Batal",
                  confirmButtonColor: "#0BD72C",
                  cancelButtonColor: "#E32626",
                  reverseButtons: true,
                }).then((isConfirm) => {
                  if (isConfirm["isConfirmed"]) {
                    mutateAsync(info.row.original.id);
                    info.table.reset();
                  }
                });
              }}
              disabled={isPending}
            >
              <Image
                src="/icons/delete.svg"
                width={24}
                height={24}
                alt="delete"
              />
            </button>
          </div>
        );
      },
      size: 1,
    }),
  ];

  return columns;
};
