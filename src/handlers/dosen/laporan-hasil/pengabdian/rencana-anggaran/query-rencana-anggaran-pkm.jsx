"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryRencanaAnggranLaporanHasilPKM = () => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchRencanaAnggranPKM = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/rencana-anggarans`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["rencanaAnggaranLaporanHasilPKM"],
    queryFn: fetchRencanaAnggranPKM,
  });

  return { ...query };
};
