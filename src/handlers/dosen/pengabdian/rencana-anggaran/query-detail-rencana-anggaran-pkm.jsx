"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRencanaAnggaranPKM = (setValue, anggaranId) => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchDetailRencanaAnggaranPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${
          pengabdianId || id
        }/rencana-anggarans/${anggaranId}`,
      );
      const result = data.data;
      setValue("rincian", result.rincian);
      setValue("biaya", result.biaya);
      return result;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["detailRencanaAnggaranPKM", anggaranId],
    queryFn: fetchDetailRencanaAnggaranPKM,
    enabled: !!anggaranId,
  });

  return { data, isLoading, refetch };
};
