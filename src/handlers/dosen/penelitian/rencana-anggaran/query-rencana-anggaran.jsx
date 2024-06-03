"use client";

import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRencanaAnggaranPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchRencanaAnggaran = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.get(
        `/proposals/dosens/penelitians/${penelitianId || id}/rencana-anggarans`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["rencanaAnggaranPenelitian"],
    queryFn: fetchRencanaAnggaran,
  });

  return { data, isLoading, refetch };
};
