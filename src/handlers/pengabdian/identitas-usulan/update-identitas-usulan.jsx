"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";
import { useParams } from "next/navigation";

export const useEditIdentitasUsulanPKM = (reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { currentStep, setCurrentStep } = useStep();
  const { id } = useParams();
  const handleEditIdentitasUsulan = async (data) => {
    try {
      const isEdit = JSON.parse(localStorage.getItem("isEdit"));

      const formData = new FormData();
      formData.append("judul_pkm", data.judul_pkm);
      formData.append("rumpun_ilmu_id", data.rumpun_ilmu_id);
      formData.append("tahun_usulan", data.tahun_usulan);
      formData.append("jangka_waktu_pkm", data.jangka_waktu_pkm);
      formData.append("ringkasan_pkm", data.ringkasan_pkm);

      if (isEdit && currentStep === 1) {
        const response = await axios.post(
          `proposals/dosen/pkms/${id}/identitas-usulans`,
          formData
        );
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", response.data.data.step);
          localStorage.setItem("isEdit", false);
          reset();
        }
      } else {
        const response = await axios.post("/proposals/dosen/pkms", formData);
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", response.data.data.step);
          localStorage.setItem("isEdit", false);
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
