"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";

import { ButtonStatus } from "@/components/button/button-status";
import { convertDate } from "@/lib/utils/convertDate";
import { ButtonDelete } from "@/components/button/button-delete";
import { ButtonUpdate } from "@/components/button/button-update";
import { useDeletePenelitianDosen } from "@/handlers/dosen/penelitian/delete-penelitian-dosen";
import { useStep } from "@/lib/hooks/useStep";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { EmptyState } from "@/components/empty-state";

export const ListPenelitian = ({
  penelitian,
  currentTab,
  tabActive,
  isLoading,
}) => {
  if (isLoading) return <SkeletonListingProposal />;
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
        <EmptyState />
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
      className={`rounded-lg px-6 py-4 shadow-custom ${
        data.status === "Draft" ? "bg-draft" : "inherit"
      }`}
      key={data?.id}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[631px]">
          <h2 className="text-lg">{data?.judul}</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/User.svg"
                height={24}
                width={24}
                alt="author"
              />
              <p className="text-sm text-[#999999]">{data?.user?.name}</p>
            </div>
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/Book.svg"
                height={24}
                width={24}
                alt="mata kuliah"
              />
              <p className="text-sm text-[#999999]">
                {data?.user?.biodata?.program_studi?.nama || "-"}
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
                <p>Reviewer</p>
                <ButtonStatus status={data?.status_reviewer} />
              </div>
              <Link
                href={`/proposal/${currentTab || tabActive}/track/${data?.id}`}
              >
                <button
                  className="hidden rounded-lg bg-primary px-7 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
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
                    title: "Anda yakin?",
                    text: "  Anda tidak akan dapat mengembalikan ini!",
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
