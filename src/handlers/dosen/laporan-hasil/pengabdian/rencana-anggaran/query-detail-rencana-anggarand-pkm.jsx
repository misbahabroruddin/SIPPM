"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRencanaAnggaranLaporanHasilPKM = (anggaranId) => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchDetailRencanaAnggaranPKM = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/rencana-anggarans/${anggaranId}`,
      );
      // const result = data.data;
      // setValue("rincian", result.rincian);
      // setValue("biaya", result.biaya);
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["detailRencanaAnggaranPKM", anggaranId],
    queryFn: fetchDetailRencanaAnggaranPKM,
    enabled: !!anggaranId,
  });

  return { ...query };
};
