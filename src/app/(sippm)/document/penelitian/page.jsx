"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";

export default function DocumentPage() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/document-black.svg"
          title="Document - Penelitian"
        />
        {/* <TableDocument /> */}
      </div>
    </ContainerPage>
  );
}
