"use client";

import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRencanaAnggaranLaporanHasilPenelitian = (
  anggaranId,
) => {
  const { id } = useParams();
  const axios = useAxios();

  const fetchDetailRencanaAnggaran = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/rencana-anggarans/${anggaranId}`,
      );
      const result = data.data;
      return result;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["detailRencanaAnggaranLaporanHasilPenelitian", anggaranId],
    queryFn: fetchDetailRencanaAnggaran,
    enabled: false,
  });

  return { ...query };
};
