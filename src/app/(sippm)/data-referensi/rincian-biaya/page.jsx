"use client";

import { ContainerPage } from "@/components/container-page";
import { BasePageTitle } from "@/components/base-page-title";
import { TableRincianBiaya } from "./components/table-rincian-biaya";

export default function page() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/data-referensi-black.svg"
          title="Rincian Biaya"
        />
        <TableRincianBiaya />
      </div>
    </ContainerPage>
  );
}
