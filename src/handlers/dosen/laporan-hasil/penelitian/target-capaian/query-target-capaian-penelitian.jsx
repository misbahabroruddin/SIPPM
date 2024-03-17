"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryTargetCapaianLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchTargetCapaianPenelitian = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/target-capaian`,
      );
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["targetCapaianPenelitianLaporanHasil"],
    queryFn: fetchTargetCapaianPenelitian,
  });

  return { data, refetch, isLoading };
};
