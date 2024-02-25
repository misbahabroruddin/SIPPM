"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useAddIdentitasUsulanPenelitian = (reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { currentStep, setCurrentStep } = useStep();
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      const isEdit = JSON.parse(localStorage.getItem("isEdit"));
      const penelitianId = localStorage.getItem("penelitianId");

      const formData = new FormData();
      formData.append("jenis_penelitian_id", data.jenis_penelitian_id);
      formData.append("rumpun_ilmu_id", data.rumpun_ilmu_id);
      formData.append("judul", data.judul);
      formData.append("bidang_fokus", data.bidang_fokus);
      formData.append("tahun_usulan", data.tahun_usulan);
      formData.append("jangka_waktu", data.jangka_waktu);
      formData.append("ringkasan", data.ringkasan);

      if (isEdit && currentStep === 1) {
        const response = await axios.post(
          `proposals/dosens/penelitians/${penelitianId || id}/identitas-usulan`,
          formData,
        );
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", 2);
          if (isEdit === true) {
            localStorage.setItem("isEdit", true);
          } else {
            localStorage.setItem("isEdit", false);
          }
          localStorage.setItem("penelitianId", response.data.data.id);
          reset();
        }
      } else {
        const response = await axios.post(
          "/proposals/dosens/penelitians",
          formData,
        );
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", 2);
          localStorage.setItem("isEdit", false);
          localStorage.setItem("penelitianId", response.data.data.id);
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

  const {
    mutateAsync: onSubmitIdentitasUsulanPenelitian,
    isPending: isLoadingSubmit,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listPenelitian"] });
    },
  });

  return {
    onSubmitIdentitasUsulanPenelitian,
    isLoadingSubmit,
  };
};
