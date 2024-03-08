"use client";

import { ContainerPage } from "@/components/container-page";
import { TableJabatanFungsional } from "./components/table-jabatan-fungsional";
import { BasePageTitle } from "@/components/base-page-title";

export default function JabatanFungsionalPage() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/data-referensi-black.svg"
          title="Jabatan Fungsional"
        />
        <TableJabatanFungsional />
      </div>
    </ContainerPage>
  );
}
