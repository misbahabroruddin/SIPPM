"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryTargetCapaianPKM = (setValue) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchTargetCapaianPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${pengabdianId || id}/target-capaian`,
      );
      setValue("luaran_wajib_id", data?.data?.luaran_wajib_id);
      setValue("tahun_capaian", data?.data?.tahun_capaian);
      setValue(
        "status_capaian",
        data?.data?.status_capaian === "null" ? "" : data?.data?.status_capaian,
      );
      setValue("nama_jurnal_penerbit", data?.data?.nama_jurnal_penerbit);
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["targetCapaianPKM"],
    queryFn: fetchTargetCapaianPKM,
    enabled: false,
  });

  return { data, refetch, isLoading };
};
