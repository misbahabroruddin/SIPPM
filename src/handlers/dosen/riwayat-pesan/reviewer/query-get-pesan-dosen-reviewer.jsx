"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatPesanDosenReviewer = (riwayatId) => {
  const axios = useAxios();

  const fetchRiwayatPesanDosenReviewer = async () => {
    try {
      const { data } = await axios.get(`/proposal/${riwayatId}/chat-reviewers`);

      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
