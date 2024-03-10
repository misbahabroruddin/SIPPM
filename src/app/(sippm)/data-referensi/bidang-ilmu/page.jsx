"use client";

import { ContainerPage } from "@/components/container-page";
import { BasePageTitle } from "@/components/base-page-title";
import { TableBidangIlmu } from "./components/table-bidang-ilmu";

export default function BidangIlmuPage() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/data-referensi-black.svg"
          title="Bidang Ilmu"
        />
        <TableBidangIlmu />
      </div>
    </ContainerPage>
  );
}
