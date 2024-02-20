"use client";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useNextStep = (payload) => {
  const axios = useAxios();
  const { id } = useParams();
  const { setCurrentStep } = useStep();

  const handleNextStep = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const isEdit = JSON.parse(localStorage.getItem("isEdit"));
      const { data } = await axios.put(
        `/proposals/dosen/penelitians/${penelitianId || id}`,
        {
          step: payload,
        }
      );
      setCurrentStep(data?.data?.step);
      localStorage.setItem("step", data?.data?.step);
      if (isEdit === true) {
        localStorage.setItem("isEdit", true);
      } else {
        localStorage.setItem("isEdit", false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleNextStepPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const isEdit = JSON.parse(localStorage.getItem("isEdit"));
      const { data } = await axios.put(
        `/proposals/dosen/pkms/${pengabdianId || id}`,
        {
          step: payload,
        }
      );
      setCurrentStep(data?.data?.step);
      localStorage.setItem("step", data?.data?.step);
      if (isEdit === true) {
        localStorage.setItem("isEdit", true);
      } else {
        localStorage.setItem("isEdit", false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { handleNextStep, handleNextStepPKM };
};
