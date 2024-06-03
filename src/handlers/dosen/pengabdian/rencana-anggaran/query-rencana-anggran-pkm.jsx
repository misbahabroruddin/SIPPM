"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRencanaAnggranPKM = () => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchRencanaAnggranPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${pengabdianId || id}/rencana-anggarans`,
      );
      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
