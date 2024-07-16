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

      const form = {
        jenis_penelitian_id: data.jenis_penelitian_id,
        rumpun_ilmu_id: data.rumpun_ilmu_id,
        judul: data.judul,
        bidang_fokus: data.bidang_fokus,
        tahun_usulan: data.tahun_usulan,
        jangka_waktu: data.jangka_waktu,
        ringkasan: data.ringkasan,
      };

      if (isEdit && currentStep === 1) {
        const response = await axios.put(
          `/proposal/penelitians/update/${penelitianId || id}`,
          form,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", 2);
          if (isEdit) {
            localStorage.setItem("isEdit", true);
          } else {
            localStorage.setItem("isEdit", false);
          }
          reset();
        }
      } else {
        const response = await axios.post("/proposal/penelitians", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
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
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const {
    mutateAsync: onSubmitIdentitasUsulanPenelitian,
    isPending: isLoadingSubmit,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listPenelitian"] });
      queryClient.invalidateQueries({
        queryKey: ["listPengabdianDashboardDosen"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listPenelitianDashboardDosen"],
      });
      queryClient.resetQueries({
        queryKey: ["infoProposalPenelitianDosenDashboard"],
      });
      queryClient.resetQueries({
        queryKey: ["infoProposalPengabdianDosenDashboard"],
      });
    },
  });

  return {
    onSubmitIdentitasUsulanPenelitian,
    isLoadingSubmit,
  };
};
