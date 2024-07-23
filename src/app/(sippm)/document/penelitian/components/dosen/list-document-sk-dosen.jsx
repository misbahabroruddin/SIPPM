"use client";
import Image from "next/image";
import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { Pagination } from "@/components/pagination";
import { ButtonDownload } from "@/components/button/button-download";
import { convertDate } from "@/lib/utils/convertDate";

export const ListPenelitianSKDosen = ({
  penelitian,
  isLoading,
  handlePageChange,
}) => {
  if (isLoading) return <SkeletonListingProposal />;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[450px] flex-col gap-4 overflow-auto p-1 md:h-[500px] lg:h-[580px]">
        {penelitian?.data?.length ? (
          penelitian?.data?.map((proposal) => (
            <ListItemSK key={proposal.id} data={proposal} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      {penelitian?.last_page > 1 ? (
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

const ListItemSK = ({ data }) => {
  return (
    <div className="rounded-lg px-6 py-4 shadow-custom" key={data?.id}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[731px]">
          <h2 className="text-base lg:text-lg">{data?.judul}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/User.svg"
                  height={24}
                  width={24}
                  alt="author"
                  className="h-5 w-5"
                />
                <p className="text-xs text-[#999999] md:text-sm">
                  {data?.user?.name}
                </p>
              </div>
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/Clock.svg"
                  height={24}
                  width={24}
                  alt="tanggal"
                  className="h-5 w-5"
                />
                <p className="text-xs text-[#999999] md:text-sm">
                  {convertDate(data?.created_at)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/Book.svg"
                  height={24}
                  width={24}
                  alt="Program studi"
                  className="h-5 w-5"
                />
                <p className="text-xs text-[#999999] md:text-sm">
                  {data?.user?.biodata?.program_studi?.nama}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-4">
          {data?.dokumen_sk ? (
            <Link
              href={data?.dokumen_sk?.url || "#"}
              target="_blank"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-white disabled:cursor-not-allowed disabled:bg-gray-500 md:w-fit"
            >
              <ButtonDownload className="px-2 py-1 md:px-4 md:py-2" />
            </Link>
          ) : (
            <div className="flex w-full flex-col items-center gap-[2px] pr-2 font-[500] md:w-fit">
              <p className="text-xs text-primary lg:text-sm">Status</p>
              <p className="text-[#333333 rounded-lg bg-[#CCCCCC] px-2 py-1 text-sm lg:text-base">
                SK Belum Ada
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
