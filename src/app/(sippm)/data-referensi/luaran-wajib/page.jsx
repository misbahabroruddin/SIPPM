"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { TableLuaranWajib } from "./components/table-luaran-wajib";

export default function LuaranWajibPage() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/data-referensi-black.svg"
          title="Luaran Wajib"
        />
        <TableLuaranWajib />
      </div>
    </ContainerPage>
  );
}
