"use client";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Swal from "sweetalert2";

import { ButtonRestore } from "@/components/button/button-restore";
import { useDeleteKabupaten } from "@/handlers/data-referensi/kabupaten/administator/delete-kabupaten";
import { ModalEditKabupaten } from "./modal-edit-kabupaten";
import { useDeleteTrashKabupaten } from "@/handlers/data-referensi/kabupaten/administator/delete-trash-kabupaten";
import { useRestoreKabupaten } from "@/handlers/data-referensi/kabupaten/administator/restore-kabupaten";

export const useColumnTableKabupaten = () => {
  const { mutateAsync, isPending } = useDeleteKabupaten();
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),
    columnHelper.accessor("kode", {
      cell: (info) => info.getValue(),
      header: () => <span>Kode</span>,
      minSize: 10,
    }),
    columnHelper.accessor("nama", {
      id: "nama",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Nama</span>,
      size: 15,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <ModalEditKabupaten id={info.row.original.id} />
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

export const useColumnTableTrashKabupaten = (onClose) => {
  const { mutateAsync: deleteTrashKabupaten, isPending: isPendingDelete } =
    useDeleteTrashKabupaten();
  const { mutateAsync: restoreKabupaten, isPending: isPendingRestore } =
    useRestoreKabupaten();
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),
    columnHelper.accessor("kode", {
      cell: (info) => info.getValue(),
      header: () => <span>Kode</span>,
      size: 5,
    }),
    columnHelper.accessor("nama", {
      id: "nama",
      cell: (info) => <i>{info.getValue()}</i>,
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
                await restoreKabupaten(info.row.original.id);
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
                    deleteTrashKabupaten(info.row.original.id);
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
