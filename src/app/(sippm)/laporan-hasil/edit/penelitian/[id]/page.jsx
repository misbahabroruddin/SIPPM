"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerContent } from "@/components/container-content";
import { ContainerPage } from "@/components/container-page";
import { Stepper } from "@/components/stepper";
import { steps } from "@/lib/datas/stepArray";
import { useStep } from "@/lib/hooks/useStep";
import { IdentitasUsulan } from "./components/step1/identitas-usulan";

export default function EditLaporanHasilPenelitianPage() {
  const {
    currentStep,
    isFirstStep,
    setIsFirstStep,
    isLastStep,
    setIsLastStep,
  } = useStep();

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
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
            className={`mt-14 flex flex-col  gap-4 ${
              currentStep !== 6 ? "mb-16" : ""
            }`}
          >
            {currentStep === 1 && <IdentitasUsulan />}
          </div>
        </ContainerContent>
      </div>
    </ContainerPage>
  );
}
