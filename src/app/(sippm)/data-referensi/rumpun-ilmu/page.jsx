"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { TableRumpunIlmu } from "./components/table-rumpun-ilmu";

export default function RumpunIlmuPage() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/data-referensi-black.svg"
          title="Rumpun Ilmu"
        />
        <TableRumpunIlmu />
      </div>
    </ContainerPage>
  );
}
