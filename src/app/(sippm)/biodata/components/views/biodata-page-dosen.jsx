"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { Profile } from "../profile";
import { Tabs } from "../tabs";

export default function BiodataPageDosen() {
  const [tabActive] = useState("profile");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");

  return (
    <ContainerPage>
      <div className='flex flex-col gap-4'>
        <BasePageTitle iconSrc='/icons/biodata-black.svg' title='Biodata' />
        <section className='flex gap-4 ml-[7px]'>
          <Profile />
          <div className='flex flex-col gap-[15px] grow'>
            <Tabs tabActive={currentTab || tabActive} />
          </div>
        </section>
      </div>
    </ContainerPage>
  );
}
