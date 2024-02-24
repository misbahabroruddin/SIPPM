"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerContent } from "@/components/container-content";
import { ContainerPage } from "@/components/container-page";
import { Stepper } from "@/components/stepper";
import { steps } from "@/lib/datas/stepArray";
import { useStep } from "@/lib/hooks/useStep";
import { IdentitasUsulan } from "./components/step1/identitas-usulan";
import { TargetCapaian } from "./components/step3/target-capaian";
import { RencanaAnggaran } from "./components/step4/rencana-anggaran";
import { RincianKegiatan } from "./components/step5/rincian-kegiatan";
import { Anggota } from "./components/step2/anggota";
import { Berkas } from "./components/step6/berkas";

export default function EditPenelitianPage() {
  const {
    currentStep,
    setCurrentStep,
    isFirstStep,
    setIsFirstStep,
    isLastStep,
    setIsLastStep,
  } = useStep();

  return (
    <ContainerPage>
      <div className='flex flex-col gap-4'>
        <BasePageTitle iconSrc='/icons/users.svg' title='Proposal' />
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
            className={`flex flex-col gap-4  mt-14 ${
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