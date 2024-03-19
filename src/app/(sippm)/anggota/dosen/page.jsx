"use client";

import { ContainerPage } from "@/components/container-page";
import { BasePageTitle } from "@/components/base-page-title";
import { TableAnggotaDosen } from "./components/table-anggota-dosen";

export default function AnggotaDosenPage() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/anggota-black.svg"
          title="Anggota Dosen"
        />
        <TableAnggotaDosen />
      </div>
    </ContainerPage>
  );
}
