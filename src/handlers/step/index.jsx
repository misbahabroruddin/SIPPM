"use client";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

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
        `/proposal/penelitians/update-step/${penelitianId || id}`,
        {
          step: payload,
        },
      );
      setCurrentStep(data?.data?.step);
      localStorage.setItem("step", data?.data?.step);
      if (isEdit === true) {
        localStorage.setItem("isEdit", true);
      } else {
        localStorage.setItem("isEdit", false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const handleNextStepPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const isEdit = JSON.parse(localStorage.getItem("isEdit"));
      const { data } = await axios.put(
        `/proposal/pengabdians/update-step/${pengabdianId || id}`,
        {
          step: payload,
        },
      );
      setCurrentStep(data?.data?.step);
      localStorage.setItem("step", data?.data?.step);
      if (isEdit === true) {
        localStorage.setItem("isEdit", true);
      } else {
        localStorage.setItem("isEdit", false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return { handleNextStep, handleNextStepPKM };
};
