"use client";
import Image from "next/image";

import { EmptyState } from "@/components/empty-state";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { Pagination } from "@/components/pagination";
import { ButtonDownload } from "@/components/button/button-download";
import { convertDate } from "@/lib/utils/convertDate";
import { ListItemKontrakDibalas } from "./list-item-kontrak-dibalas";
import { ListItemKontrakMenunggu } from "./list-item-kontrak-menunggu";
import { useId } from "react";

export const ListPenelitianKontrakLppm = ({
  penelitian,
  isLoading,
  handlePageChange,
}) => {
  if (isLoading) return <SkeletonListingProposal />;
  const id = useId();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[580px] flex-col gap-4 overflow-auto p-1">
        {penelitian?.data?.length ? (
          penelitian?.data?.map((proposal) => (
            <ListItemKontrakMenunggu key={proposal.id} data={proposal} />
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
