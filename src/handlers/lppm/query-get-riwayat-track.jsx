"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { notFound, useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatTrackDosenLPPM = () => {
  const axios = useAxios();
  const { id } = useParams();

  const { data, status, isLoading, refetch } = useQuery({
    queryKey: ["trackDosenLPPM", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/proposals/riwayats/${id}/lppms`);
        return data.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  if (status === "error") return notFound();

  return {
    data,
    isLoading,
    status,
    refetch,
  };
};
