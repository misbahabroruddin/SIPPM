"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryRencanaAnggranPKM = () => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchRencanaAnggranPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosen/pkms/${pengabdianId || id}/rencana-anggarans`
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["rencanaAnggaranPKM"],
    queryFn: fetchRencanaAnggranPKM,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
