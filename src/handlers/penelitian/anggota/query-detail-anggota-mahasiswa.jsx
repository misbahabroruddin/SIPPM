"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaMahasiswaPenelitian = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailAnggotaMahasiswa = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.get(
        `/proposals/dosen/penelitians/${
          penelitianId || id
        }/anggotas/${anggotaId}`
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
    queryKey: ["detailAnggotaMahasiswa", anggotaId],
    queryFn: fetchDetailAnggotaMahasiswa,
  });

  return { detail, isLoading, refetch };
};
