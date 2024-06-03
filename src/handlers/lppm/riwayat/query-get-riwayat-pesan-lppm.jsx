"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatPesanLPPM = (riwayatId) => {
  const axios = useAxios();

  const fetchRiwayatPesanLPPM = async () => {
    try {
      const { data } = await axios.get(
        `/proposals/lppms/verifikasis/${riwayatId}/chats`,
      );

      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getRiwayatPesanLPPM", riwayatId],
    queryFn: fetchRiwayatPesanLPPM,
    enabled: !!riwayatId,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
