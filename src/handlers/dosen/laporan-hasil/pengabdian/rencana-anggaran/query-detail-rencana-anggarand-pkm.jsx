"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRencanaAnggaranLaporanHasilPKM = (anggaranId) => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchDetailRencanaAnggaranPKM = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/rencana-anggarans/${anggaranId}`,
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
    queryKey: ["detailRencanaAnggaranPKM", anggaranId],
    queryFn: fetchDetailRencanaAnggaranPKM,
    enabled: !!anggaranId,
  });

  return { ...query };
};
