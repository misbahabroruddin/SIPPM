"use client";

import { useSession } from "next-auth/react";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import dynamic from "next/dynamic";
import { DOSEN, LPPM } from "@/lib/constants/role";

const DocumentPenelitianLPPM = dynamic(
  () => import("./components/views/document-penelitian-lppm"),
  { ssr: false },
);

const DocumentPenelitianDosen = dynamic(
  () => import("./components/views/document-penelitian-dosen"),
  { ssr: false },
);

export default function DocumentPage() {
  const { data } = useSession();
  const role = data?.user?.roles[0].name;

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/document-black.svg"
          title="Document - Penelitian"
        />
        {role === LPPM ? <DocumentPenelitianLPPM /> : null}
        {role === DOSEN ? <DocumentPenelitianDosen /> : null}
      </div>
    </ContainerPage>
  );
}
