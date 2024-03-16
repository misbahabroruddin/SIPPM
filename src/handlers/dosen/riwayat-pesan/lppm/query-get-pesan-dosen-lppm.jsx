"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatPesanDosenLPPM = (riwayatId) => {
  const axios = useAxios();

  const fetchRiwayatPesanDosenLPPM = async () => {
    try {
      const { data } = await axios.get(
        `/proposals/dosens/chats/${riwayatId}/lppms`,
      );

      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getRiwayatPesanDosenLPPM", riwayatId],
    queryFn: fetchRiwayatPesanDosenLPPM,
    enabled: !!riwayatId,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
