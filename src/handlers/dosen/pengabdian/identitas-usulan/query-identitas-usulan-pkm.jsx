"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";
import { toast } from "react-toastify";

export const useQueryIdentitasUsulanPKM = (setValue) => {
  const axios = useAxios();

  const fetchIdentitasUsulan = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `proposals/dosens/pkms/${pengabdianId}/identitas-usulan`,
      );
      setValue("rumpun_ilmu_id", data?.data.rumpun_ilmu.id, {
        shouldValidate: true,
      });
      setValue("judul", data?.data.judul);
      setValue("tahun_usulan", data?.data.tahun_usulan);
      setValue("jangka_waktu", data?.data.jangka_waktu);
      setValue("ringkasan", data?.data.ringkasan);

      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["identitas-usulan-pkm"],
    queryFn: fetchIdentitasUsulan,
    enabled: false,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
