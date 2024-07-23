"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useAddTargetCapaianLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { setCurrentStep } = useStep();
  const { id } = useParams();
  const onSubmit = async (form) => {
    try {
      const formData = {
        luaran_wajib_id: form.luaran_wajib_id,
        tahun_capaian: form.tahun_capaian,
        status_capaian: form.status_capaian,
        nama_jurnal_penerbit: form.nama_jurnal_penerbit,
      };
      const { data } = await axios.put(
        `/laporan-hasils/target-capaian/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      setCurrentStep(4);
      localStorage.setItem("step", 4);
      return data;
    } catch (error) {
      if (error.response?.data.message.tahun_capaian) {
        return toast.error(error.response.data.message.tahun_capaian[0]);
      }

      if (error.response.status === 401) {
        return signOut();
      } else if (error.response.status === 500) {
        return toast.error("Internal server error");
      }

      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmit,
  });

  return {
    ...mutate,
  };
};
