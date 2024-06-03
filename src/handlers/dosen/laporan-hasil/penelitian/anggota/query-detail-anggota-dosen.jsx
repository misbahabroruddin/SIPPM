"use client";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
