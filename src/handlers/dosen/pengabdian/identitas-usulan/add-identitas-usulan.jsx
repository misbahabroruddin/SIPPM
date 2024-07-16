"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useAddIdentitasUsulanPKM = (reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { currentStep, setCurrentStep } = useStep();
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      const isEdit = JSON.parse(localStorage.getItem("isEdit"));
      const pengabdianId = localStorage.getItem("pengabdianId");

      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("rumpun_ilmu_id", data.rumpun_ilmu_id);
      formData.append("tahun_usulan", data.tahun_usulan);
      formData.append("jangka_waktu", data.jangka_waktu);
      formData.append("ringkasan", data.ringkasan);

      if (isEdit && currentStep === 1) {
        const response = await axios.post(
          `/proposal/pengabdians/update/${pengabdianId || id}`,
          formData,
        );
        if (response.data.data) {
          setCurrentStep(2);
          if (isEdit === true) {
            localStorage.setItem("isEdit", true);
          } else {
            localStorage.setItem("isEdit", false);
          }
          localStorage.setItem("step", 2);
          localStorage.setItem("pengabdianId", response.data.data.id);
          reset();
        }
      } else {
        const response = await axios.post("/proposal/pengabdians", formData);
        if (response.data.data) {
          setCurrentStep(2);
          localStorage.setItem("step", 2);
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

      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { mutateAsync: onSubmitIdentitasUsulan, isPending: isLoadingSubmit } =
    useMutation({
      mutationFn: onSubmit,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["listPengabdian"] });
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
    onSubmitIdentitasUsulan,
    isLoadingSubmit,
  };
};
