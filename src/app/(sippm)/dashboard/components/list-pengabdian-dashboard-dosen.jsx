"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";

import { ButtonStatus } from "@/components/button/button-status";
import { convertDate } from "@/lib/utils/convertDate";
import { ButtonDelete } from "@/components/button/button-delete";
import { ButtonUpdate } from "@/components/button/button-update";
import { useDeletePengabdianDosen } from "@/handlers/dosen/pengabdian/delete-pengabdian-dosen";
import { useStep } from "@/lib/hooks/useStep";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";

export const ListPengabdian = ({
  pengabdian,
  currentTab,
  tabActive,
  isLoading,
  handlePageChange,
}) => {
  if (isLoading) return <SkeletonListingProposal />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[300px] flex-col gap-4 overflow-auto p-1">
        {pengabdian?.data?.length ? (
          pengabdian?.data?.map((proposal) => (
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
      {pengabdian?.last_page > 1 ? (
        <Pagination
          perPage={pengabdian?.per_page}
          onPageChange={handlePageChange}
          pageCount={pengabdian?.last_page}
          pageOffset={pengabdian?.current_page - 1}
        />
      ) : null}
    </div>
  );
};

const ListItem = ({ data, currentTab, tabActive }) => {
  const { onDeletePengabdianDosen, isLoadingDelete } =
    useDeletePengabdianDosen();
  const { setCurrentStep } = useStep();

  return (
    <div
      className={`rounded-lg p-3 shadow-custom lg:px-6 lg:py-4 ${
        data.status === "Draft" ? "bg-draft" : "inherit"
      }`}
      key={data?.id}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[731px]">
          <h2 className="text-base lg:text-lg">{data?.judul}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
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
        <div className="flex flex-wrap items-end justify-center gap-4">
          {data.status === "Terkirim" ? (
            <>
              <div className="flex w-2/5 flex-col items-center gap-1 lg:w-fit">
                <p>LPPM</p>
                <ButtonStatus
                  status={data?.status_lppm}
                  className="w-full lg:w-fit"
                />
              </div>
              <div className="flex w-2/5 flex-col items-center gap-1 lg:w-fit">
                <p>Reviewer</p>
                <ButtonStatus
                  status={data?.status_reviewer}
                  className="lg-px-4 w-full px-3 lg:w-fit"
                />
              </div>
              <Link
                href={`/proposal/${currentTab || tabActive}/track/${data?.id}`}
                className="w-full lg:w-fit"
              >
                <button
                  className="w-full rounded-lg bg-primary px-7 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
                  disabled={data?.status_lppm === "Pending"}
                >
                  Track
                </button>
              </Link>
            </>
          ) : (
            <div className="flex w-full flex-wrap gap-2 lg:w-fit lg:gap-4">
              <ButtonDelete
                onClick={() => {
                  Swal.fire({
                    title: "Anda yakin?",
                    text: "  Anda tidak akan dapat mengembalikan ini!",
                    icon: "warning",
                    dangerMode: true,
                    showCancelButton: true,
                    confirmButtonText: "Ya, hapus",
                    cancelButtonText: "Tidak, batalkan",
                    confirmButtonColor: "#0BD72C",
                    cancelButtonColor: "#E32626",
                    reverseButtons: true,
                  }).then((isConfirm) => {
                    if (isConfirm["isConfirmed"]) {
                      onDeletePengabdianDosen(data?.id);
                    }
                  });
                }}
                disabled={isLoadingDelete}
                className="w-full lg:w-24"
              />
              <Link
                href={`/proposal/pengabdian/edit/${data?.id}`}
                className="w-full lg:w-fit"
              >
                <ButtonUpdate
                  onClick={() => {
                    localStorage.setItem("isEdit", true);
                    localStorage.setItem("step", 1);
                    setCurrentStep(1);
                  }}
                  disabled={isLoadingDelete}
                  className="w-full lg:w-24"
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
