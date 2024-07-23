"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatPesanDosenLPPM = (riwayatId) => {
  const axios = useAxios();

  const fetchRiwayatPesanDosenLPPM = async () => {
    try {
      const { data } = await axios.get(`/proposal/${riwayatId}/chat-lppms`);

      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
