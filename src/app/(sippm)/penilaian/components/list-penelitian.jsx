"use client";
import Image from "next/image";

import { Pagination } from "@/components/pagination";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { convertDate } from "@/lib/utils/convertDate";
import { EmptyState } from "@/components/empty-state";
import Link from "next/link";
import { ButtonUpdate } from "@/components/button/button-update";
import { useSession } from "next-auth/react";
import { REVIEWER } from "@/lib/constants/role";

export const ListPenelitian = ({ penelitian, isLoading, handlePageChange }) => {
  if (isLoading) return <SkeletonListingProposal />;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-[600px] flex-col gap-4 overflow-auto p-1 pb-8">
        {penelitian?.data?.length ? (
          penelitian?.data?.map((proposal) => (
            <ListItemPenelitian key={proposal.id} data={proposal} />
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

const ListItemPenelitian = ({ data }) => {
  const session = useSession();
  const role = session.data.user.roles[0].name;

  const path =
    role === REVIEWER
      ? `/penilaian/penelitian/${data?.id}/penilaian-reviewer`
      : `/penilaian/penelitian/${data?.id}`;

  return (
    <div className="rounded-lg px-6 py-4 shadow-custom" key={data?.id}>
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
        <div className="flex items-end gap-14">
          <div className="flex flex-col items-center gap-1">
            <p>Total Nilai</p>
            <p className="text-xl font-[500]">{data?.total_skor}</p>
          </div>
          <Link href={path}>
            <ButtonUpdate
              className="bg-primary disabled:bg-gray-600"
              text="Detail"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
