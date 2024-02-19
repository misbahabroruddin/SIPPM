"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useAddTargetCapaianPenelitian = () => {
  const axios = useAxios();
  const { setCurrentStep } = useStep();
  const { id } = useParams();
  const onSubmit = async (form) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const formData = new FormData();
      formData.append("luaran_wajib_id", form.luaran_wajib_id);
      formData.append("tahun_capaian", form.tahun_capaian);
      formData.append("status_capaian", form.status_capaian);
      formData.append("nama_jurnal_penerbit", form.nama_jurnal_penerbit);
      const { data } = await axios.post(
        `/proposals/dosen/penelitians/${penelitianId || id}/target-capaians`,
        formData
      );

      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: addTargetCapaianPenelitian,
    isPending: isLoadingSubmit,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      setCurrentStep(4);
      localStorage.setItem("step", 4);
      localStorage.setItem("isEdit", false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    addTargetCapaianPenelitian,
    isLoadingSubmit,
  };
};