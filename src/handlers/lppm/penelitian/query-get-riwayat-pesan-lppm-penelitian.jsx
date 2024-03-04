"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatPesanLPPMPenelitian = (riwayatId) => {
  const axios = useAxios();

  const fetchRiwayatPesanLPPMPenelitian = async () => {
    try {
      const { data } = await axios.get(`/proposals/chats/${riwayatId}/lppms`);

      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getRiwayatPesanPenelitian", riwayatId],
    queryFn: fetchRiwayatPesanLPPMPenelitian,
    enabled: !!riwayatId,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
