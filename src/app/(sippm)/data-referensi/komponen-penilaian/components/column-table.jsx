"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Swal from "sweetalert2";

import { ButtonRestore } from "@/components/button/button-restore";
import { ModalEditKomponenPenilaian } from "./modal-edit-komponen-penilaian";
import { useDeleteKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/delete-komponen-penilaian";
import { useDeleteTrashKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/delete-trash-komponen-penilaian";
import { useRestoreKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/restore-komponen-penilaian";

export const useColumnTableKomponenPenilaian = () => {
  const { mutateAsync, isPending } = useDeleteKomponenPenilaian();
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),
    columnHelper.accessor("kriteria_penilaian.nama", {
      id: "kriteria_penilaian.nama",
      cell: (info) => info.getValue(),
      header: () => <span>Kriteria Penilaian</span>,
      size: 5,
    }),
    columnHelper.accessor("nama", {
      cell: (info) => info.getValue(),
      header: () => <span>Nama</span>,
      size: 5,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <ModalEditKomponenPenilaian id={info.row.original.id} />
            <button
              className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
              onClick={async () => {
                await mutateAsync(info.row.original.id);
                info.table.reset();
              }}
              disabled={isPending}
              title="Delete"
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

export const useColumnTableTrashKomponenPenilaian = (onClose) => {
  const {
    mutateAsync: deleteTrashKomponenPenilaian,
    isPending: isPendingDelete,
  } = useDeleteTrashKomponenPenilaian();

  const { mutateAsync: restoreKomponenPenilaian, isPending: isPendingRestore } =
    useRestoreKomponenPenilaian();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),
    columnHelper.accessor("kriteria_penilaian_id", {
      id: "kriteria_penilaian_id",
      cell: (info) => info.getValue(),
      header: () => <span>Kriteria Penilaian</span>,
      size: 5,
    }),
    columnHelper.accessor("nama", {
      cell: (info) => info.getValue(),
      header: () => <span>Nama</span>,
      size: 5,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex gap-2">
            <ButtonRestore
              onClick={async () => {
                await restoreKomponenPenilaian(info.row.original.id);
                onClose();
              }}
              disabled={isPendingRestore}
            />
            <button
              className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
              onClick={async () => {
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
                    deleteTrashKomponenPenilaian(info.row.original.id);
                    onClose();
                  }
                });
              }}
              title="Delete"
              disabled={isPendingDelete}
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
