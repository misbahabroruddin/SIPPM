"use client";

import Image from "next/image";
import Link from "next/link";

import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { convertDate } from "@/lib/utils/convertDate";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { CardDashboard } from "@/components/card/card-dashboard";

export const ListPenelitianDashboardLPPM = ({
  penelitian,
  currentTab,
  tabActive,
  isLoading,
  handlePageChange,
  totalPenelitianRevisi,
  totalPenelitianDisetujui,
  totalPenelitianDitolak,
  totalPenelitianPending,
  totalProposal,
}) => {
  if (isLoading) return <SkeletonListingProposal />;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 lg:flex-nowrap">
        <CardDashboard jumlah={totalProposal} status="Total" />
        <CardDashboard jumlah={totalPenelitianPending} status="Pending" />
        <CardDashboard jumlah={totalPenelitianDisetujui} />
        <CardDashboard status="Ditolak" jumlah={totalPenelitianDitolak} />
        <CardDashboard status="Revisi" jumlah={totalPenelitianRevisi} />
      </div>
      <div className="flex h-[550px] flex-col gap-4 overflow-auto p-1">
        {penelitian?.data?.length ? (
          penelitian?.data
            ?.filter((item) => item.status === "Terkirim")
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
        <div className="flex items-end gap-4">
          <Link
            href={`/proposal/penelitian/detail/lppm/${data?.id}`}
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
