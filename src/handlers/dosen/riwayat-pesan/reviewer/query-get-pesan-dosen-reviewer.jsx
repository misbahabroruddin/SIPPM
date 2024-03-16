"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatPesanDosenReviewer = (riwayatId) => {
  const axios = useAxios();

  const fetchRiwayatPesanDosenReviewer = async () => {
    try {
      const { data } = await axios.get(
        `/proposals/dosens/chats/${riwayatId}/reviewers`,
      );

      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getRiwayatPesanDosenReviewer", riwayatId],
    queryFn: fetchRiwayatPesanDosenReviewer,
    enabled: !!riwayatId,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
