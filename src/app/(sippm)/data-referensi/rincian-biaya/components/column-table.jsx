"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Swal from "sweetalert2";

import { ButtonRestore } from "@/components/button/button-restore";
import { useDeleteRincianBiaya } from "@/handlers/data-referensi/rincian-biaya/administrator/delete-rincian-biaya";
import { useDeleteTrashRincianBiaya } from "@/handlers/data-referensi/rincian-biaya/administrator/delete-trash-rincian-biaya";
import { useRestoreRincianBiaya } from "@/handlers/data-referensi/rincian-biaya/administrator/restore-rincian-biaya";
import { ModalEditRincianBiaya } from "./modal-edit-rincian-biaya";
import { convertToRupiah } from "@/lib/utils/convertToRupiah";

export const useColumnTableRincianBiaya = () => {
  const { mutateAsync, isPending } = useDeleteRincianBiaya();
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),
    columnHelper.accessor("rincian", {
      cell: (info) => info.getValue(),
      header: () => <span>Rincian</span>,
      size: 5,
    }),
    columnHelper.accessor("anggaran", {
      id: "anggaran",
      cell: (info) => <i>{convertToRupiah(info.getValue())}</i>,
      header: () => <span>Anggaran</span>,
      size: 5,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <ModalEditRincianBiaya id={info.row.original.id} />
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

export const useColumnTableTrashRincianBiaya = (onClose) => {
  const { mutateAsync: deleteTrashRincianBiaya, isPending: isPendingDelete } =
    useDeleteTrashRincianBiaya();
  const { mutateAsync: restoreRincianBiaya, isPending: isPendingRestore } =
    useRestoreRincianBiaya();
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (props) => {
        return props?.table?.getSortedRowModel()?.rows?.indexOf(props?.row) + 1;
      },
      maxSize: 1,
    }),
    columnHelper.accessor("rincian", {
      cell: (info) => info.getValue(),
      header: () => <span>Rincian</span>,
      size: 5,
    }),
    columnHelper.accessor("anggaran", {
      id: "anggaran",
      cell: (info) => <i>{convertToRupiah(info.getValue())}</i>,
      header: () => <span>Anggaran</span>,
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
                await restoreRincianBiaya(info.row.original.id);
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
                    deleteTrashRincianBiaya(info.row.original.id);
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
