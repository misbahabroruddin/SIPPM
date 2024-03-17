"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaMahasiswaLaporanHasilPenelitian = (
  anggotaId,
) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailAnggotaMahasiswa = async () => {
    try {
      const { data } = await axios.get(
        `/proposals/dosens/penelitians/${id}/anggotas/${anggotaId}`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: detail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["detailAnggotaMahasiswaLaporanHasil", anggotaId],
    queryFn: fetchDetailAnggotaMahasiswa,
    enabled: !!anggotaId,
  });

  return { detail, isLoading, refetch };
};
