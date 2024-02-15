"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";
import { toast } from "react-toastify";

export const useQueryTargetCapaianPKM = (setValue) => {
  const axios = useAxios();

  const fetchTargetCapaianPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosen/pkms/${pengabdianId}/target-capaians`
      );
      setValue("luaran_wajib_id", data?.data?.luaran_wajib_id);
      setValue("tahun_capaian", data?.data?.tahun_capaian);
      setValue("status_capaian", data?.data?.status_capaian);
      setValue("nama_jurnal_penerbit", data?.data?.nama_jurnal_penerbit);
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["targetCapaianPKM"],
    queryFn: fetchTargetCapaianPKM,
  });

  return { data, refetch, isLoading };
};
