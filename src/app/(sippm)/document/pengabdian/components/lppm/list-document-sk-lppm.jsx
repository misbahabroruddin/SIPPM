"use client";
import Image from "next/image";

import { EmptyState } from "@/components/empty-state";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { Pagination } from "@/components/pagination";
import { convertDate } from "@/lib/utils/convertDate";
import { ModalUploadSkPengabdian } from "./modal-upload-sk-pengabdian";

export const ListPengabdianSKLppm = ({
  pengabdian,
  isLoading,
  handlePageChange,
}) => {
  if (isLoading) return <SkeletonListingProposal />;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[500px] flex-col gap-4 overflow-auto p-1 md:h-[500px] lg:h-[550px]">
        {pengabdian?.data?.length ? (
          pengabdian?.data?.map((proposal) => (
            <ListItemSK key={proposal.id} data={proposal} />
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

const ListItemSK = ({ data }) => {
  return (
    <div className="rounded-lg px-6 py-4 shadow-custom" key={data?.id}>
      <div className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:justify-between">
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
                  className="h-5 w-5 lg:h-6 lg:w-6"
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
                  className="h-5 w-5 lg:h-6 lg:w-6"
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
                  className="h-5 w-5 lg:h-6 lg:w-6"
                />
                <p className="text-xs text-[#999999] md:text-sm">
                  {data?.user?.biodata?.program_studi?.nama}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-center gap-4 lg:flex-nowrap">
          {!data?.dokumen_sk ? (
            <ModalUploadSkPengabdian
              pengabdianId={data?.id}
              buttonClassName="justify-center w-full lg:w-fit"
            />
          ) : (
            <>
              <div className="order-1 flex flex-col items-center gap-2 font-[500] lg:order-none lg:mr-10">
                <p className="text-sm">SK</p>
                <p className="rounded-lg bg-[#D5FACC] px-2 py-1 text-[#23B900]">
                  Terkirim
                </p>
              </div>
              <ModalUploadSkPengabdian
                pengabdianId={data?.id}
                buttonClassName="justify-center w-full lg:w-fit order-2 lg:order-none"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
