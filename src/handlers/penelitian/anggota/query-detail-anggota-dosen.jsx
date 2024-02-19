"use client";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaDosenPenelitian = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailAnggotaDosen = async () => {
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
    queryKey: ["detailAnggotaDosen", anggotaId],
    queryFn: fetchDetailAnggotaDosen,
  });

  return { detail, isLoading, refetch };
};
