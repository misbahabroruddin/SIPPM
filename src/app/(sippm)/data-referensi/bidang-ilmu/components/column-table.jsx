"use client";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Swal from "sweetalert2";

import { ButtonRestore } from "@/components/button/button-restore";
import { useDeleteBidangIlmu } from "@/handlers/data-referensi/bidang-ilmu/administrator/delete-bidang-ilmu";
import { useDeleteTrashBidangIlmu } from "@/handlers/data-referensi/bidang-ilmu/administrator/delete-trash-jabatan-fungsional";
import { useRestoreBidangIlmu } from "@/handlers/data-referensi/bidang-ilmu/administrator/restore-bidang-ilmu";
import { ModalEditBidangIlmu } from "./modal-edit-bidang-ilmu";

export const useColumnTableBidangIlmu = () => {
  const { mutateAsync, isPending } = useDeleteBidangIlmu();
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
      minSize: 10,
    }),
    columnHelper.accessor("keterangan", {
      id: "keterangan",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Keterangan</span>,
      size: 15,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <ModalEditBidangIlmu id={info.row.original.id} />
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

export const useColumnTableTrashBidangIlmu = (onClose) => {
  const { mutateAsync: deleteTrashBidangIlmu, isPending: isPendingDelete } =
    useDeleteTrashBidangIlmu();
  const { mutateAsync: restoreBidangIlmu, isPending: isPendingRestore } =
    useRestoreBidangIlmu();
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
                await restoreBidangIlmu(info.row.original.id);
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
                    deleteTrashBidangIlmu(info.row.original.id);
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
