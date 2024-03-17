"use client";

import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["rencanaAnggaranLaporanHasilPenelitian"],
    queryFn: fetchRencanaAnggaran,
  });

  return { ...query };
};
