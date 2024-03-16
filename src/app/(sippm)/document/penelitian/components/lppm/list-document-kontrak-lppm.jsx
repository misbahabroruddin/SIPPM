"use client";
import { useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { Pagination } from "@/components/pagination";

import { twMerge } from "tailwind-merge";
import { ListItemKontrakDibalas } from "./list-item-kontrak-dibalas";
import { ListItemKontrakDikirim } from "./list-item-dikirim";
import { ListItemKontrakMenunggu } from "./list-item-kontrak-menunggu";

export const ListPenelitianKontrakLppm = ({
  penelitian,
  isLoading,
  handlePageChange,
}) => {
  const [tab, setTab] = useState("Menunggu");
  if (isLoading) return <SkeletonListingProposal />;

  const kontrakMenunggu = penelitian?.data?.filter(
    (proposal) => !proposal?.dokumen_kontrak,
  );

  const kontrakDikirim = penelitian?.data?.filter(
    (proposal) => proposal?.dokumen_kontrak?.status === "Menunggu",
  );

  const kontrakDibalas = penelitian?.data?.filter(
    (proposal) => proposal?.dokumen_kontrak?.status === "Dibalas",
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={twMerge(
            "flex h-[120px] w-[200px] flex-col items-center justify-center gap-6 rounded-lg border border-sky-05 p-3 font-[500] text-sky-05",
            tab === "Menunggu" ? "bg-sky-05 text-white" : null,
          )}
          role="button"
          onClick={() => setTab("Menunggu")}
        >
          <p className="text-3xl">{kontrakMenunggu.length}</p>
          <p className="text-xl">Menunggu</p>
        </div>
        <div
          className={twMerge(
            "text-green-05 border-green-05 flex h-[120px] w-[200px] flex-col items-center justify-center gap-6 rounded-lg border p-3 font-[500]",
            tab === "Dikirim" ? "bg-green-05 text-white" : null,
          )}
          role="button"
          onClick={() => setTab("Dikirim")}
        >
          <p className="text-3xl">{kontrakDikirim?.length}</p>
          <p className="text-xl">Dikirim</p>
        </div>
        <div
          className={twMerge(
            "flex h-[120px] w-[200px] flex-col items-center justify-center gap-6 rounded-lg border border-blue-primary p-3 font-[500] text-blue-primary",
            tab === "Dibalas" ? "bg-blue-primary text-white" : null,
          )}
          role="button"
          onClick={() => setTab("Dibalas")}
        >
          <p className="text-3xl">{kontrakDibalas?.length}</p>
          <p className="text-xl">Dibalas</p>
        </div>
      </div>
      <div className="flex h-[480px] flex-col gap-4 overflow-auto p-1">
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
