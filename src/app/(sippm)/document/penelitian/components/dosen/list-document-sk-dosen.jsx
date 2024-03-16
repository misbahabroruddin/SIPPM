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
      <div className="flex h-[580px] flex-col gap-4 overflow-auto p-1">
        {penelitian?.data?.length ? (
          penelitian?.data?.map((proposal) => (
            <ListItemSK key={proposal.id} data={proposal} />
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

const ListItemSK = ({ data }) => {
  return (
    <div className="rounded-lg px-6 py-4 shadow-custom" key={data?.id}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[731px]">
          <h2 className="text-lg">{data?.judul}</h2>
          <div className="flex flex-col gap-2">
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
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/Book.svg"
                  height={24}
                  width={24}
                  alt="mata kuliah"
                />
                <p className="text-sm text-[#999999]">
                  {data?.user?.biodata?.program_studi?.nama}
                </p>
              </div>
              {/* <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/date-edit.svg"
                  height={24}
                  width={24}
                  alt="tanggal"
                />
                <p className="text-sm text-[#999999]">{data?.tahun_ajaran}</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-end gap-4">
          <Link
            // onClick={handleSaveFile}
            href={data?.dokumen_sk?.file_sk?.url}
            target="_blank"
            className="flex items-center gap-2 rounded-lg bg-primary text-white disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            <ButtonDownload />
          </Link>
        </div>
      </div>
    </div>
  );
};
