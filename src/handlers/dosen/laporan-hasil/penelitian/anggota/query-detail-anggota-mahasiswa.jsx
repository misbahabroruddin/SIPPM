"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

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
    queryKey: ["detailAnggotaMahasiswaLaporanHasil", anggotaId],
    queryFn: fetchDetailAnggotaMahasiswa,
    enabled: !!anggotaId,
  });

  return { detail, isLoading, refetch };
};
