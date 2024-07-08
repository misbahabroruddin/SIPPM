"use client";

import { ContainerPage } from "@/components/container-page";
import { BasePageTitle } from "@/components/base-page-title";
import { TableJenisDokumen } from "./components/table-jenis-dokumen";

export default function page() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/data-referensi-black.svg"
          title="Jenis Dokumen"
        />
        <TableJenisDokumen />
      </div>
    </ContainerPage>
  );
}
