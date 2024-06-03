"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useQueryIdentitasUsulanOnUpdate = (setValue) => {
  const axios = useAxios();
  const params = useParams();
  const { setCurrentStep } = useStep();

  const fetchIdentitasUsulanById = async () => {
    try {
      const step = localStorage.getItem("step");
      const { data } = await axios.get(
        `proposals/dosens/pkms/${params.id}/identitas-usulan`,
      );

      setValue("rumpun_ilmu_id", data?.data.rumpun_ilmu.id, {
        shouldValidate: true,
      });
      setValue("judul", data?.data.judul);
      setValue("tahun_usulan", data?.data.tahun_usulan);
      setValue("jangka_waktu", data?.data.jangka_waktu);
      setValue("ringkasan", data?.data.ringkasan);
      localStorage.setItem("step", 1);
      localStorage.setItem("isEdit", true);
      if (!step) setCurrentStep(1);
      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["identitas-usulan-by-id"],
    queryFn: fetchIdentitasUsulanById,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
