"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRencanaAnggaranPKM = (setValue, id) => {
  const axios = useAxios();
  const fetchDetailRencanaAnggaranPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosen/pkms/${pengabdianId}/rencana-anggarans/${id}`
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
    queryKey: ["detailRencanaAnggaranPKM", id],
    queryFn: fetchDetailRencanaAnggaranPKM,
  });

  return { data, isLoading, refetch };
};
