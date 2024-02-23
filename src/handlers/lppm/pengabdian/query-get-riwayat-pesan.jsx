"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatPesanPengabdian = (riwayatId) => {
  const axios = useAxios();

  const fetchGetRiwayatPesanPengabdian = async () => {
    try {
      const { data } = await axios.get(
        `/lppms/pkms/riwayats/${riwayatId}/chats`
      );

      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getRiwayatPesanPengabdian", riwayatId],
    queryFn: fetchGetRiwayatPesanPengabdian,
    enabled: !!riwayatId,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
