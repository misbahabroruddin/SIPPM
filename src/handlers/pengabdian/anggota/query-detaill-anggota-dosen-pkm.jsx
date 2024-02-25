"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaDosenPKM = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();
  const pengabdianId = localStorage.getItem("pengabdianId");

  const fetchDetailAnggotaDosen = async () => {
    try {
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${pengabdianId || id}/anggotas/${anggotaId}`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data: detail, isLoading } = useQuery({
    queryKey: ["detailAnggotaDosenPKM", anggotaId],
    queryFn: fetchDetailAnggotaDosen,
  });

  return {
    detail,
    isLoading,
  };
};
