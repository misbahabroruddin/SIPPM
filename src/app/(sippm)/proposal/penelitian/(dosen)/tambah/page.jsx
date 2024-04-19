"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { Stepper } from "@/components/stepper";
import { useEffect } from "react";

import { IdentitasUsulan } from "./components/step1/identitas-usulan";
import { Anggota } from "./components/step2/anggota";
import { TargetCapaian } from "./components/step3/target-capaian";
import { useStep } from "@/lib/hooks/useStep";
import { RencanaAnggaran } from "./components/step4/rencana-anggaran";
import { ContainerContent } from "@/components/container-content";
import { RincianKegiatan } from "./components/step5/rincian-kegiatan";
import { Berkas } from "./components/step6/berkas";
import { ContainerPage } from "@/components/container-page";
import { steps } from "@/lib/datas/stepArray";

export default function TambahPenelitianPage() {
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
        <BasePageTitle iconSrc="/icons/users.svg" title="Proposal" />
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
            {currentStep === 1 && <IdentitasUsulan />}
            {currentStep === 2 && <Anggota />}
            {currentStep === 3 && <TargetCapaian />}
            {currentStep === 4 && <RencanaAnggaran />}
            {currentStep === 5 && <RincianKegiatan />}
            {currentStep === 6 && <Berkas />}
          </div>
        </ContainerContent>
      </div>
    </ContainerPage>
  );
}
