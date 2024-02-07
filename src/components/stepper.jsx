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
    <div className='w-full px-24 py-4'>
      <StepperMaterialize
        activeStep={currentStep - 1}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        lineClassName='bg-[#7091AF] h-1'
        activeLineClassName='bg-primary'
      >
        {steps?.map((step) => (
          <Step
            className='h-14 w-14 !bg-[#DAEDFF]'
            activeClassName='!bg-[#DAEDFF] outline outline-1 outline-[#10487A]'
            completedClassName='!bg-[#10487A] text-white'
            key={step.id}
          >
            {currentStep === step.id || currentStep <= step.id ? (
              <Image src={step.iconActive} width={24} height={24} alt='icon' />
            ) : (
              <Image
                src={step.iconComplete}
                width={24}
                height={24}
                alt='icon'
              />
            )}
            <div className='absolute -bottom-[3rem] min-w-[100px] min-h-fit h-10 text-center'>
              <Typography
                variant='paragraph'
                className={`text-sm text-primary font-poppins ${
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
