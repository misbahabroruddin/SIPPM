"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

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
        `proposals/dosen/pkms/${params.id}/identitas-usulans`
      );

      setValue("rumpun_ilmu_id", data?.data.rumpun_ilmu.id, {
        shouldValidate: true,
      });
      setValue("judul_pkm", data?.data.judul_pkm);
      setValue("tahun_usulan", data?.data.tahun_usulan);
      setValue("jangka_waktu_pkm", data?.data.jangka_waktu_pkm);
      setValue("ringkasan_pkm", data?.data.ringkasan_pkm);
      localStorage.setItem("step", 1);
      localStorage.setItem("isEdit", true);
      if (!step) setCurrentStep(1);
      return data.data;
    } catch (error) {
      toast.error(error.message);
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
