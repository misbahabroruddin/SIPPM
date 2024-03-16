"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatPesanReviewer = (riwayatId) => {
  const axios = useAxios();

  const fetchRiwayatPesanReviewer = async () => {
    try {
      const { data } = await axios.get(
        `/proposals/reviewers/verifikasis/${riwayatId}/chats`,
      );

      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getRiwayatPesanReviewer", riwayatId],
    queryFn: fetchRiwayatPesanReviewer,
    enabled: !!riwayatId,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
