"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useAddTargetCapaianProposal = () => {
  const axios = useAxios();
  const { setCurrentStep } = useStep();
  const { id } = useParams();
  const onSubmit = async (form) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      let formData = {
        luaran_wajib_id: form.luaran_wajib_id,
        tahun_capaian: form.tahun_capaian,
        nama_jurnal_penerbit: form.nama_jurnal_penerbit,
      };

      if (form.status_capaian) {
        formData = {
          ...formData,
          status_capaian: form.status_capaian,
        };
      } else {
        formData = {
          ...formData,
          status_capaian: "-",
        };
      }

      const { data } = await axios.put(
        `/proposal/${penelitianId || pengabdianId || id}/target-capaian`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      setCurrentStep(4);
      localStorage.setItem("step", 4);
      localStorage.setItem("isEdit", false);
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      } else if (error.response?.data.message.tahun_capaian) {
        return toast.error(error.response.data.message.tahun_capaian[0]);
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmit,
  });

  return {
    ...mutate,
  };
};
