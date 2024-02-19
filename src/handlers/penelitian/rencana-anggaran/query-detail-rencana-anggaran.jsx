"use client";

import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRencanaAnggaranPenelitian = (
  setValue,
  anggaranId
) => {
  const { id } = useParams();
  const axios = useAxios();

  const fetchDetailRencanaAnggaran = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.get(
        `/proposals/dosen/penelitians/${
          penelitianId || id
        }/rencana-anggarans/${anggaranId}`
      );
      const result = data.data;
      setValue("rincian", result.rincian);
      setValue("biaya", result.biaya);
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["detailRencanaAnggaranPenelitian", anggaranId],
    queryFn: fetchDetailRencanaAnggaran,
    enabled: !!anggaranId,
  });

  return { data, isLoading, refetch };
};
