"use client";
import Image from "next/image";

import {
  Stepper as StepperMaterialize,
  Step,
  Typography,
} from "@material-tailwind/react";

export const Stepper = ({
  currentStep = 1,
  steps,
  setIsLastStep,
  setIsFirstStep,
}) => {
  return (
    <div className="w-full px-3 py-4 lg:px-24">
      <StepperMaterialize
        activeStep={currentStep - 1}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        lineClassName="bg-[#7091AF] h-1"
        activeLineClassName="bg-primary"
      >
        {steps?.map((step) => (
          <Step
            className="h-8 w-8 !bg-[#DAEDFF] lg:h-14 lg:w-14"
            activeClassName="!bg-[#DAEDFF] outline outline-1 outline-[#10487A]"
            completedClassName="!bg-[#10487A] text-white"
            key={step.id}
          >
            {currentStep === step.id || currentStep <= step.id ? (
              <Image
                src={step.iconActive}
                width={24}
                height={24}
                alt="icon"
                className="h-5 w-5 lg:h-6 lg:w-6"
              />
            ) : (
              <Image
                src={step.iconComplete}
                width={24}
                height={24}
                alt="icon"
                className="h-5 w-5 lg:h-6 lg:w-6"
              />
            )}
            <div className="absolute -bottom-[3rem] hidden h-10 min-h-fit min-w-[100px] text-center lg:block">
              <Typography
                variant="paragraph"
                className={`font-poppins text-sm text-primary ${
                  currentStep === step.id ? "font-[500]" : "font-normal"
                }`}
              >
                {step.label}
              </Typography>
            </div>
          </Step>
        ))}
      </StepperMaterialize>
    </div>
  );
};
