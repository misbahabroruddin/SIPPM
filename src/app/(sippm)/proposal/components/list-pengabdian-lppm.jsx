"use client";
import Image from "next/image";
import Link from "next/link";

import { ButtonStatus } from "@/components/button/button-status";
import { CardDashboard } from "@/components/card/card-dashboard";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { convertDate } from "@/lib/utils/convertDate";

export const ListPengabdianProposalLPPM = ({
  pengabdian,
  currentTab,
  tabActive,
  isLoading,
  jumlahPengabdianDisetujui,
  jumlahPengabdianRevisi,
  jumlahPengabdianDitolak,
  jumlahPengabdianPending,
  handlePagePengabdianChange,
}) => {
  if (isLoading) return <SkeletonListingProposal />;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 lg:flex-nowrap">
        <CardDashboard jumlah={jumlahPengabdianPending} status="Pending" />
        <CardDashboard jumlah={jumlahPengabdianDisetujui} />
        <CardDashboard status="Revisi" jumlah={jumlahPengabdianRevisi} />
        <CardDashboard status="Ditolak" jumlah={jumlahPengabdianDitolak} />
      </div>
      <div className="flex h-[570px] flex-col gap-4 overflow-auto p-1 pb-8">
        {pengabdian?.data?.length ? (
          pengabdian?.data
            ?.filter((item) => item.status !== "Draft")
            .map((proposal) => (
              <ListItem
                data={proposal}
                currentTab={currentTab}
                key={proposal?.id}
                tabActive={tabActive}
              />
            ))
        ) : (
          <EmptyState />
        )}
      </div>
      {pengabdian?.data?.length ? (
        <Pagination
          perPage={pengabdian?.per_page}
          onPageChange={handlePagePengabdianChange}
          pageCount={pengabdian?.last_page}
          pageOffset={pengabdian?.current_page - 1}
        />
      ) : null}
    </div>
  );
};

const ListItem = ({ data, currentTab, tabActive }) => {
  return (
    <div className="rounded-lg p-3 shadow-custom lg:px-6 lg:py-4">
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
              <p className="text-sm text-[#999999]">
                {data?.user?.biodata?.nama_lengkap || data?.user?.name}
              </p>
            </div>
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/Book.svg"
                height={24}
                width={24}
                alt="mata kuliah"
              />
              <p className="text-sm text-[#999999]">
                {data?.user?.biodata?.program_studi.nama}
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
        <div className="flex flex-wrap items-end justify-center gap-4 lg:flex-nowrap lg:justify-start">
          <div className="flex flex-col items-center gap-1">
            <p>LPPM</p>
            <ButtonStatus status={data?.status_lppm} />
          </div>
          <Link
            href={`/proposal/${currentTab || tabActive}/track/${data?.id}`}
            className="w-full lg:w-fit"
          >
            <button className="w-full rounded-lg bg-primary px-7 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500">
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
