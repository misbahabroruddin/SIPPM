"use client";

import { useDeleteJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/delete-jabatan-fungsional";
import { createColumnHelper } from "@tanstack/react-table";
import { ModalEditJabatanFungsional } from "./modal-edit-jabatan-fungsional";
import Image from "next/image";
import { useRestoreJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/restore-jabatan-fungsional";
import { ButtonRestore } from "@/components/button/button-restore";
import { useDeleteTrashJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/delete-trash-jabatan-fungsional";
import Swal from "sweetalert2";

export const useColumnTableJabatanFungsional = () => {
  const { mutateAsync, isPending } = useDeleteJabatanFungsional();
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),
    columnHelper.accessor("nama", {
      cell: (info) => info.getValue(),
      header: () => <span>Nama</span>,
      size: 5,
    }),
    columnHelper.accessor("keterangan", {
      id: "keterangan",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Keterangan</span>,
      size: 5,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <ModalEditJabatanFungsional id={info.row.original.id} />
            <button
              className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
              onClick={async () => {
                await mutateAsync(info.row.original.id);
                info.table.reset();
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

export const useColumnTableTrashJabatanFungsional = (onClose) => {
  const {
    mutateAsync: deleteTrashJabatanFungsional,
    isPending: isPendingDelete,
  } = useDeleteTrashJabatanFungsional();
  const { mutateAsync: restoreJabatanFungsional, isPending: isPendingRestore } =
    useRestoreJabatanFungsional();
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),
    columnHelper.accessor("nama", {
      cell: (info) => info.getValue(),
      header: () => <span>Nama</span>,
      size: 5,
    }),
    columnHelper.accessor("keterangan", {
      id: "keterangan",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Keterangan</span>,
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
                await restoreJabatanFungsional(info.row.original.id);
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
                    deleteTrashJabatanFungsional(info.row.original.id);
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
