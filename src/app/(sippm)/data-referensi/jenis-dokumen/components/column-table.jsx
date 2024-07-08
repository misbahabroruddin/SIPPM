"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Swal from "sweetalert2";

import { ButtonRestore } from "@/components/button/button-restore";
import { useDeleteJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/delete-jenis-dokumen";
import { useDeleteTrashJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/delete-trash-jenis-dokumen";
import { useRestoreJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/restore-jenis-dokumen";
import { ModalEditJenisDokumen } from "./modal-edit-jenis-dokumen";

export const useColumnTableJenisDokumen = () => {
  const { mutateAsync, isPending } = useDeleteJenisDokumen();

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
    columnHelper.accessor("mimes", {
      id: "mimes",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Tipe File</span>,
      size: 5,
    }),
    columnHelper.accessor("size", {
      id: "size",
      cell: (info) => <i>{`${info.getValue()?.toLocaleString("id-ID")} Kb`}</i>,
      header: () => <span>Size</span>,
      size: 5,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <ModalEditJenisDokumen id={info.row.original.id} />
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

export const useColumnTableTrashJenisDokumen = (onClose) => {
  const { mutateAsync: deleteTrashJenisDokumen, isPending: isPendingDelete } =
    useDeleteTrashJenisDokumen();

  const { mutateAsync: restoreJenisDokumen, isPending: isPendingRestore } =
    useRestoreJenisDokumen();

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
    columnHelper.accessor("mimes", {
      id: "mimes",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Tipe File</span>,
      size: 5,
    }),
    columnHelper.accessor("size", {
      id: "size",
      cell: (info) => <i>{`${info.getValue()?.toLocaleString("id-ID")} Kb`}</i>,
      header: () => <span>Size</span>,
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
                await restoreJenisDokumen(info.row.original.id);
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
                    deleteTrashJenisDokumen(info.row.original.id);
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
