"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { EmptyState } from "@/components/empty-state";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { Pagination } from "@/components/pagination";
import { ListItemKontrakDibalas } from "./list-item-kontrak-dibalas";
import { ListItemKontrakDikirim } from "./list-item-dikirim";
import { ListItemKontrakMenunggu } from "./list-item-kontrak-menunggu";
import { ListItemKontrakDiterima } from "./list-item-kontrak-diterima";

export const ListPengabdianKontrakLppm = ({
  pengabdian,
  isLoading,
  handlePageChange,
}) => {
  const [tab, setTab] = useState("Menunggu");
  if (isLoading) return <SkeletonListingProposal />;

  const kontrakMenunggu = pengabdian?.data?.filter(
    (proposal) => !proposal?.dokumen_kontrak,
  );

  const kontrakDikirim = pengabdian?.data?.filter(
    (proposal) => proposal?.dokumen_kontrak?.status === "Menunggu",
  );

  const kontrakDibalas = pengabdian?.data?.filter(
    (proposal) => proposal?.dokumen_kontrak?.status === "Dibalas",
  );

  const kontrakDiterima = pengabdian?.data?.filter(
    (proposal) => proposal?.dokumen_kontrak?.status === "Diterima",
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:gap-4">
        <div
          className={twMerge(
            "flex h-[80px] w-[160px] flex-col items-center justify-center gap-2 rounded-lg border border-red-07 p-3 font-[500] text-red-07 lg:h-[120px] lg:w-[200px] lg:gap-6",
            tab === "Menunggu" ? "bg-red-07 text-white" : null,
          )}
          role="button"
          onClick={() => setTab("Menunggu")}
        >
          <p className="text-xl lg:text-3xl">{kontrakMenunggu?.length}</p>
          <p className="text-base lg:text-xl">Menunggu</p>
        </div>
        <div
          className={twMerge(
            "flex h-[80px] w-[160px] flex-col items-center justify-center gap-2 rounded-lg border border-green-05 p-3 font-[500] text-green-05 lg:h-[120px] lg:w-[200px] lg:gap-6",
            tab === "Dikirim" ? "bg-green-05 text-white" : null,
          )}
          role="button"
          onClick={() => setTab("Dikirim")}
        >
          <p className="text-xl lg:text-3xl">{kontrakDikirim?.length}</p>
          <p className="text-base lg:text-xl">Dikirim</p>
        </div>
        <div
          className={twMerge(
            "flex h-[80px] w-[160px] flex-col items-center justify-center gap-2 rounded-lg border border-sky-05 p-3 font-[500] text-sky-05 lg:h-[120px] lg:w-[200px] lg:gap-6",
            tab === "Dibalas" ? "bg-sky-05 text-white" : null,
          )}
          role="button"
          onClick={() => setTab("Dibalas")}
        >
          <p className="text-xl lg:text-3xl">{kontrakDibalas?.length}</p>
          <p className="text-base lg:text-xl">Dibalas</p>
        </div>
        <div
          className={twMerge(
            "flex h-[80px] w-[160px] flex-col items-center justify-center gap-2 rounded-lg border border-blue-primary p-3 font-[500] text-blue-primary lg:h-[120px] lg:w-[200px] lg:gap-6",
            tab === "Diterima" ? "bg-blue-primary text-white" : null,
          )}
          role="button"
          onClick={() => setTab("Diterima")}
        >
          <p className="text-xl lg:text-3xl">{kontrakDiterima?.length}</p>
          <p className="text-base lg:text-xl">Diterima</p>
        </div>
      </div>
      <div className="flex h-[350px] flex-col gap-4 overflow-auto p-1 md:h-[350px] lg:h-[450px]">
        {tab === "Menunggu" ? (
          kontrakMenunggu?.length ? (
            kontrakMenunggu?.map((proposal) => (
              <ListItemKontrakMenunggu key={proposal.id} data={proposal} />
            ))
          ) : (
            <EmptyState />
          )
        ) : null}
        {tab === "Dikirim" ? (
          kontrakDikirim?.length ? (
            kontrakDikirim?.map((proposal) => (
              <ListItemKontrakDikirim key={proposal.id} data={proposal} />
            ))
          ) : (
            <EmptyState />
          )
        ) : null}
        {tab === "Dibalas" ? (
          kontrakDibalas?.length ? (
            kontrakDibalas?.map((proposal) => (
              <ListItemKontrakDibalas key={proposal.id} data={proposal} />
            ))
          ) : (
            <EmptyState />
          )
        ) : null}
        {tab === "Diterima" ? (
          kontrakDiterima?.length ? (
            kontrakDiterima?.map((proposal) => (
              <ListItemKontrakDiterima key={proposal.id} data={proposal} />
            ))
          ) : (
            <EmptyState />
          )
        ) : null}
      </div>
      {pengabdian?.data?.length ? (
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
