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
import ListCardPenelitianDashboardDosen from "./list-card-penelitian-dashboard-dosen";
import { Pagination } from "@/components/pagination";

export const ListPenelitian = ({
  penelitian,
  currentTab,
  tabActive,
  isLoading,
  totalProposal,
  handlePageChange,
}) => {
  if (isLoading) return <SkeletonListingProposal />;

  const totalPenelitianDisetujui =
    totalProposal?.data.status_reviewer?.diterima;

  const totalPenelitianDitolak = totalProposal?.data.status_reviewer?.ditolak;

  return (
    <div className="flex flex-col gap-4">
      <ListCardPenelitianDashboardDosen
        jumlahPenelitian={totalProposal?.data?.total || 0}
        jumlahPenelitianDisetujui={totalPenelitianDisetujui}
        jumlahPenelitianDitolak={totalPenelitianDitolak}
      />
      <div className="flex h-[480px] flex-col gap-4 overflow-auto p-1">
        {penelitian?.data?.length ? (
          penelitian?.data?.map((proposal) => (
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
      {penelitian?.data?.length ? (
        <Pagination
          perPage={penelitian?.per_page}
          onPageChange={handlePageChange}
          pageCount={penelitian?.last_page}
          pageOffset={penelitian?.current_page - 1}
        />
      ) : null}
    </div>
  );
};

const ListItem = ({ data, currentTab, tabActive }) => {
  const { onDeletePenelitianDosen, isLoadingDelete } =
    useDeletePenelitianDosen();
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
                      onDeletePenelitianDosen(data?.id);
                    }
                  });
                }}
                disabled={isLoadingDelete}
                className="w-full lg:w-24"
              />
              <Link
                href={`/proposal/penelitian/edit/${data?.id}`}
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
