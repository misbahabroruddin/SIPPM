"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { TableProgramStudi } from "./components/table-program-studi";

export default function ProgramStudiLayout() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/data-referensi-black.svg"
          title="Program Studi"
        />
        <TableProgramStudi />
      </div>
    </ContainerPage>
  );
}
