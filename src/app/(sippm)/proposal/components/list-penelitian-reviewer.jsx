"use client";
import Image from "next/image";
import Link from "next/link";

import { ButtonStatus } from "@/components/button/button-status";
import { CardDashboard } from "@/components/card/card-dashboard";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { convertDate } from "@/lib/utils/convertDate";

export const ListPenelitianProposalReviewer = ({
  penelitian,
  isLoading,
  jumlahPenelitianDisetujui,
  jumlahPenelitianRevisi,
  jumlahPenelitianDitolak,
  handlePageChange,
}) => {
  if (isLoading) return <SkeletonListingProposal />;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <CardDashboard jumlah={jumlahPenelitianDisetujui || 0} />
        <CardDashboard status="Revisi" jumlah={jumlahPenelitianRevisi || 0} />
        <CardDashboard status="Ditolak" jumlah={jumlahPenelitianDitolak || 0} />
      </div>
      <div className="flex h-[570px] flex-col gap-4 overflow-auto p-1 pb-8">
        {penelitian?.data.length ? (
          penelitian?.data
            ?.filter((item) => item.status !== "Draft")
            .map((proposal) => <ListItem data={proposal} key={proposal?.id} />)
        ) : (
          <EmptyState />
        )}
      </div>
      {penelitian?.data?.last_page > 1 ? (
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

const ListItem = ({ data }) => {
  return (
    <div className="rounded-lg px-6 py-4 shadow-custom">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[731px]">
          <h2 className="text-lg">{data?.judul}</h2>
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
          <div className="flex flex-col items-center gap-1">
            <p>LPPM</p>
            <ButtonStatus status={data?.status_lppm} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p>Reviewer</p>
            <ButtonStatus status={data?.status_reviewer} />
          </div>
          <Link href={`/proposal/penelitian/detail/reviewer/${data?.id}`}>
            <button className="rounded-lg bg-primary px-7 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500">
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
