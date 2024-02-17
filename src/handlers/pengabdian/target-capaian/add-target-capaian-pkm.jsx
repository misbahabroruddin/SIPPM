"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useAddTargetCapaianPKM = () => {
  const axios = useAxios();
  const { setCurrentStep } = useStep();
  const { id } = useParams();
  const onSubmit = async (form) => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const formData = new FormData();
      formData.append("luaran_wajib_id", form.luaran_wajib_id);
      formData.append("tahun_capaian", form.tahun_capaian);
      formData.append("status_capaian", form.status_capaian);
      formData.append("nama_jurnal_penerbit", form.nama_jurnal_penerbit);
      const { data } = await axios.post(
        `/proposals/dosen/pkms/${pengabdianId || id}/target-capaians`,
        formData
      );
      setCurrentStep(4);
      localStorage.setItem("step", 4);
      localStorage.setItem("isEdit", false);

      return data;
    } catch (error) {
      if (error.response?.data.message.tahun_capaian) {
        return toast.error(error.response.data.message.tahun_capaian[0]);
      }
      toast.error(error.message);
    }
  };

  const { mutateAsync: addTargetCapaianPKM, isPending } = useMutation({
    mutationFn: onSubmit,
  });

  return {
    addTargetCapaianPKM,
    isPending,
  };
};
