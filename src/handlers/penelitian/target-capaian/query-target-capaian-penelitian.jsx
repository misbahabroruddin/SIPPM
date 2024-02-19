"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryTargetCapaianPenelitian = (setValue) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchTargetCapaianPenelitian = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.get(
        `/proposals/dosen/penelitians/${penelitianId || id}/target-capaians`
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
    queryKey: ["targetCapaianPenelitian"],
    queryFn: fetchTargetCapaianPenelitian,
    enabled: false,
  });

  return { data, refetch, isLoading };
};
