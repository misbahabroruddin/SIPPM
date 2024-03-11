"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { TableJenisPenelitian } from "./components/table-jenis-penelitian";

export default function JenisPenelitianLayout() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/data-referensi-black.svg"
          title="Jenis Penelitian"
        />
        <TableJenisPenelitian />
      </div>
    </ContainerPage>
  );
}
