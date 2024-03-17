"use client";

import { useSession } from "next-auth/react";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import dynamic from "next/dynamic";
import { DOSEN, LPPM } from "@/lib/constants/role";

const DocumentPengabdianLppm = dynamic(
  () => import("./components/views/document-pengabdian-lppm"),
);

const DocumentPengabdianDosen = dynamic(
  () => import("./components/views/document-pengabdian-dosen"),
);

export default function DocumentPengabdianPage() {
  const { data } = useSession();
  const role = data?.user?.roles[0].name;

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/document-black.svg"
          title="Document - Pengabdian"
        />
        {role === LPPM ? <DocumentPengabdianLppm /> : null}
        {role === DOSEN ? <DocumentPengabdianDosen /> : null}
      </div>
    </ContainerPage>
  );
}
