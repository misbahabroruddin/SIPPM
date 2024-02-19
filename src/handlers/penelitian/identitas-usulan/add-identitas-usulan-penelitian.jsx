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
      formData.append("judul_penelitian", data.judul_penelitian);
      formData.append("bidang_fokus_penelitian", data.bidang_fokus_penelitian);
      formData.append("tahun_usulan", data.tahun_usulan);
      formData.append("jangka_waktu_penelitian", data.jangka_waktu_penelitian);
      formData.append("ringkasan_penelitian", data.ringkasan_penelitian);

      if (isEdit && currentStep === 1) {
        const response = await axios.post(
          `proposals/dosen/penelitians/${penelitianId || id}/identitas-usulans`,
          formData
        );
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", response.data.data.step);
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
          "/proposals/dosen/penelitians",
          formData
        );
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", response.data.data.step);
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
