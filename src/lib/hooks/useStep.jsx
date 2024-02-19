"use client";

import { createContext, useContext, useEffect, useState } from "react";

const StepContext = createContext();

export const StepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isLastStep, setIsLastStep] = useState(false);

  useEffect(() => {
    const step = JSON.parse(localStorage.getItem("step"));

    if (step) {
      setCurrentStep(step);
    }
  }, [currentStep]);

  return (
    <StepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isFirstStep,
        setIsFirstStep,
        isLastStep,
        setIsLastStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};
