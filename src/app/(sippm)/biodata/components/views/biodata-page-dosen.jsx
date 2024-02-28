"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { Profile } from "../profile";
import { Tabs } from "../tabs";

const FormBiodata = dynamic(() => import("../form-biodata"), { ssr: false });

export default function BiodataPageDosen() {
  const [tabActive] = useState("profile");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle iconSrc="/icons/biodata-black.svg" title="Biodata" />
        <section className="ml-[7px] flex gap-4">
          <Profile />
          <div className="flex grow flex-col gap-[15px]">
            <Tabs tabActive={currentTab || tabActive} />
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 shadow-custom">
              <div className="relative flex flex-col gap-2 border-b border-gray-200 px-8 pt-4">
                <h2 className="text-lg font-[500] text-primary">Biodata</h2>
                {/* <p className="z-20 w-fit rounded-lg rounded-bl-none rounded-br-none border border-b-0 border-gray-200 px-2 py-1">
                  Biodata
                </p> */}
              </div>
              <FormBiodata />
            </div>
          </div>
        </section>
      </div>
    </ContainerPage>
  );
}
