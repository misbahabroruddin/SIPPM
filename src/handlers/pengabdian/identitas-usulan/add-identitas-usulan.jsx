"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useAddIdentitasUsulanPKM = (reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { currentStep, setCurrentStep } = useStep();

  const onSubmit = async (data) => {
    try {
      const isEdit = JSON.parse(localStorage.getItem("isEdit"));
      const pengabdianId = localStorage.getItem("pengabdianId");

      const formData = new FormData();
      formData.append("judul_pkm", data.judul_pkm);
      formData.append("rumpun_ilmu_id", data.rumpun_ilmu_id);
      formData.append("tahun_usulan", data.tahun_usulan);
      formData.append("jangka_waktu_pkm", data.jangka_waktu_pkm);
      formData.append("ringkasan_pkm", data.ringkasan_pkm);

      if (isEdit && currentStep === 1) {
        const response = await axios.post(
          `proposals/dosen/pkms/${pengabdianId}/identitas-usulans`,
          formData
        );
        if (response.data.data) {
          setCurrentStep(2);
          if (isEdit === true) {
            localStorage.setItem("isEdit", true);
          } else {
            localStorage.setItem("isEdit", false);
          }
          localStorage.setItem("step", response.data.data.step);
          localStorage.setItem("pengabdianId", response.data.data.id);
          reset();
        }
      } else {
        const response = await axios.post("/proposals/dosen/pkms", formData);
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", response.data.data.step);
          if (isEdit === true) {
            localStorage.setItem("isEdit", true);
          } else {
            localStorage.setItem("isEdit", false);
          }
          localStorage.setItem("pengabdianId", response.data.data.id);
          reset();
        }
      }
    } catch (error) {
      if (error.response?.data.message.tahun_usulan) {
        return toast.error(error.response.data.message.tahun_usulan[0]);
      }
      toast.error(error.message);
    }
  };

  const { mutateAsync: onSubmitIdentitasUsulan, isPending: isLoadingSubmit } =
    useMutation({
      mutationFn: onSubmit,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["listPengabdian"] });
      },
    });

  return {
    onSubmitIdentitasUsulan,
    isLoadingSubmit,
  };
};
