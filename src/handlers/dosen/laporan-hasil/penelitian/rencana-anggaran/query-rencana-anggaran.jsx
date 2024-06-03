"use client";

import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRencanaAnggaranLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchRencanaAnggaran = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/rencana-anggarans`,
      );
      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["rencanaAnggaranLaporanHasilPenelitian"],
    queryFn: fetchRencanaAnggaran,
  });

  return { ...query };
};
