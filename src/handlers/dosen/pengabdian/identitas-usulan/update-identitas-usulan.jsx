"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useEditIdentitasUsulanPKM = (reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { currentStep, setCurrentStep } = useStep();
  const { id } = useParams();
  const handleEditIdentitasUsulan = async (data) => {
    try {
      const isEdit = JSON.parse(localStorage.getItem("isEdit"));

      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("rumpun_ilmu_id", data.rumpun_ilmu_id);
      formData.append("tahun_usulan", data.tahun_usulan);
      formData.append("jangka_waktu", data.jangka_waktu);
      formData.append("ringkasan", data.ringkasan);

      if (isEdit && currentStep === 1) {
        const response = await axios.post(
          `proposals/dosens/pkms/${id}/identitas-usulan`,
          formData,
        );
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", 2);
          localStorage.setItem("isEdit", false);
          reset();
        }
      } else {
        const response = await axios.post("/proposals/dosens/pkms", formData);
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", 2);
          localStorage.setItem("isEdit", false);
          reset();
        }
      }
    } catch (error) {
      if (error.response?.data.message.tahun_usulan) {
        return toast.error(error.response.data.message.tahun_usulan[0]);
      }

      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { mutateAsync: onEditIdentitasUsulan, isPending: isLoadingEdit } =
    useMutation({
      mutationFn: handleEditIdentitasUsulan,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["listPengabdian"] });
      },
    });

  return {
    onEditIdentitasUsulan,
    isLoadingEdit,
  };
};
