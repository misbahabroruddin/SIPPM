"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRencanaAnggaranPKM = (setValue, anggaranId) => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchDetailRencanaAnggaranPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosen/pkms/${
          pengabdianId || id
        }/rencana-anggarans/${anggaranId}`
      );
      const result = data.data;
      setValue("rincian", result.rincian);
      setValue("biaya", result.biaya);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["detailRencanaAnggaranPKM", anggaranId],
    queryFn: fetchDetailRencanaAnggaranPKM,
    enabled: !!anggaranId,
  });

  return { data, isLoading, refetch };
};
