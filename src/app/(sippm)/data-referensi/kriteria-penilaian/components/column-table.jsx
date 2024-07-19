"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Swal from "sweetalert2";

import { ButtonRestore } from "@/components/button/button-restore";
import { ModalEditKriteriaPenilaian } from "./modal-edit-kriteria-penilaian";
import { useDeleteKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/delete-kriteria-penilaian";
import { useDeleteTrashKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/delete-trash-kriteria-penilaian";
import { useRestoreKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/restore-kriteria-penilaian";

export const useColumnTableKriteriaPenilaian = () => {
  const { mutateAsync, isPending } = useDeleteKriteriaPenilaian();
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
    columnHelper.accessor("bobot", {
      id: "bobot",
      cell: (info) => info.getValue(),
      header: () => <span>Bobot</span>,
      size: 5,
    }),
    columnHelper.accessor("komponen_penilaians", {
      id: "komponen_penilaians",
      cell: (info) => (
        <ul style={{ listStyleType: "lower-alpha" }}>
          {info.getValue().map((c) => (
            <li>{c.nama}</li>
          ))}
        </ul>
      ),
      header: () => <span>Komponen Penilaian</span>,
      size: 5,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <span>Action</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <ModalEditKriteriaPenilaian id={info.row.original.id} />
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

export const useColumnTableTrashKriteriaPenilaian = (onClose) => {
  const {
    mutateAsync: deleteTrashKriteriaPenilaian,
    isPending: isPendingDelete,
  } = useDeleteTrashKriteriaPenilaian();

  const { mutateAsync: restoreKriteriaPenilaian, isPending: isPendingRestore } =
    useRestoreKriteriaPenilaian();

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
    columnHelper.accessor("bobot", {
      id: "bobot",
      cell: (info) => info.getValue(),
      header: () => <span>Bobot</span>,
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
                await restoreKriteriaPenilaian(info.row.original.id);
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
                    deleteTrashKriteriaPenilaian(info.row.original.id);
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
