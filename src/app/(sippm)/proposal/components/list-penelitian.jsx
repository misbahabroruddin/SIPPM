"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";

import { ButtonStatus } from "@/components/button/button-status";
import { convertDate } from "@/lib/utils/convertDate";
import { ButtonDelete } from "@/components/button/button-delete";
import { ButtonUpdate } from "@/components/button/button-update";
import { useDeletePenelitianDosen } from "@/handlers/penelitian/delete-penelitian-dosen";
import { useStep } from "@/lib/hooks/useStep";

export const ListPenelitian = ({
  penelitian,
  currentTab,
  tabActive,
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  return (
    <div className="flex flex-col gap-4">
      {penelitian?.length ? (
        penelitian?.map((proposal) => (
          <ListItem
            key={proposal.id}
            data={proposal}
            currentTab={currentTab}
            tabActive={tabActive}
          />
        ))
      ) : (
        <div className="flex h-40 w-full flex-col justify-center gap-4">
          <div className="text-center">Tidak ada data</div>
        </div>
      )}
    </div>
  );
};

const ListItem = ({ data, currentTab, tabActive }) => {
  const { onDeletePenelitianDosen, isLoadingDelete } =
    useDeletePenelitianDosen();
  const { setCurrentStep } = useStep();

  return (
    <div
      className={`rounded-lg px-6 py-4 shadow ${
        data.status === "Draft" ? "bg-draft" : "inherit"
      }`}
      key={data?.id}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[631px]">
          <h2 className="text-lg">{data?.judul_penelitian}</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/User.svg"
                height={24}
                width={24}
                alt="author"
              />
              <p className="text-sm text-[#999999]">{data?.user.name}</p>
            </div>
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/Book.svg"
                height={24}
                width={24}
                alt="mata kuliah"
              />
              <p className="text-sm text-[#999999]">
                {data?.user.biodata.program_studi.nama}
              </p>
            </div>
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/Clock.svg"
                height={24}
                width={24}
                alt="tanggal"
              />
              <p className="text-sm text-[#999999]">
                {convertDate(data?.created_at)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-4">
          {data.status === "Terkirim" ? (
            <>
              <div className="flex flex-col items-center gap-1">
                <p>LPPM</p>
                <ButtonStatus status={data?.status_lppm} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p>Review</p>
                <ButtonStatus status={data?.status_reviewer} />
              </div>
              <Link
                href={`/proposal/${currentTab || tabActive}/track/${data?.id}`}
              >
                <button
                  className="rounded-lg bg-primary px-7 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
                  disabled={data?.status_lppm === "Pending"}
                >
                  Track
                </button>
              </Link>
            </>
          ) : (
            <div className="flex gap-4">
              <ButtonDelete
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    dangerMode: true,
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete",
                    cancelButtonText: "No, cancel",
                    confirmButtonColor: "#0BD72C",
                    cancelButtonColor: "#E32626",
                    reverseButtons: true,
                  }).then((isConfirm) => {
                    if (isConfirm["isConfirmed"]) {
                      onDeletePenelitianDosen(data?.id);
                    }
                  });
                }}
                disabled={isLoadingDelete}
              />
              <Link href={`/proposal/penelitian/edit/${data?.id}`}>
                <ButtonUpdate
                  onClick={() => {
                    localStorage.setItem("isEdit", true);
                    localStorage.setItem("step", 1);
                    setCurrentStep(1);
                  }}
                  disabled={isLoadingDelete}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="rounded-lg px-6 py-4 shadow">
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-[631px] flex-col gap-2">
          <span className="h-6 w-1/2 animate-pulse rounded bg-gray-200 text-lg"></span>
          <div className="flex gap-4">
            <span className="h-6 w-3/4 animate-pulse rounded bg-gray-200 text-lg"></span>
          </div>
        </div>
      </div>
    </div>
  );
};