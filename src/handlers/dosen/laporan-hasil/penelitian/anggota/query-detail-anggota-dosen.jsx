"use client";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaDosenLaporanHasilPenelitian = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailAnggotaDosen = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/anggotas/${anggotaId}`,
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
    queryKey: ["detailAnggotaDosenLaporanHasil", anggotaId],
    queryFn: fetchDetailAnggotaDosen,
    enabled: !!anggotaId,
  });

  return { detail, isLoading, refetch };
};
