"use client";
import { useEffect } from "react";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerContent } from "@/components/container-content";
import { ContainerPage } from "@/components/container-page";
import { Stepper } from "@/components/stepper";
import { steps } from "@/lib/datas/stepArray";
import { useStep } from "@/lib/hooks/useStep";
import { IdentitasUsulanPKM } from "./components/step1/identitas-usulan";
import { AnggotaPKM } from "./components/step2/anggota-pkm";
import { TargetCapaianPKM } from "./components/step3/target-capaian-pkm";
import { RencanaAnggaranPKM } from "./components/step4/rencana-anggaran-pkm";
import { RincianKegiatanPKM } from "./components/step5/rincian-kegiatan-pkm";
import { BerkasPKM } from "./components/step6/berkas-pkm";

export default function TambahPengabdianPage() {
  const {
    currentStep,
    isFirstStep,
    setIsFirstStep,
    isLastStep,
    setIsLastStep,
  } = useStep();

  useEffect(() => {
    return;
  }, [currentStep]);
  return (
    <ContainerPage>
      <div className="flex flex-col gap-2 lg:gap-4">
        <BasePageTitle iconSrc="/icons/users.svg" title="Pengabdian" />
        <ContainerContent>
          <Stepper
            steps={steps}
            currentStep={currentStep}
            setIsFirstStep={setIsFirstStep}
            setIsLastStep={setIsLastStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
          />
          <div
            className={`mt-0 flex flex-col gap-4  lg:mt-14 ${
              currentStep !== 6 ? "mb-16" : ""
            }`}
          >
            {currentStep === 1 && <IdentitasUsulanPKM />}
            {currentStep === 2 && <AnggotaPKM />}
            {currentStep === 3 && <TargetCapaianPKM />}
            {currentStep === 4 && <RencanaAnggaranPKM />}
            {currentStep === 5 && <RincianKegiatanPKM />}
            {currentStep === 6 && <BerkasPKM />}
          </div>
        </ContainerContent>
      </div>
    </ContainerPage>
  );
}
