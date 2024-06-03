"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRincianKegiatanLaporanHasilPKM = (
  setValue,
  setStartDate,
  setEndDate,
  anggaranId,
) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailRincianKegiatan = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/rincian-kegiatans/${anggaranId}`,
      );
      const result = data.data;
      const dateRangeArr = result.waktu.split(",");
      const dateStart = new Date(dateRangeArr[0]);
      const dateEnd = new Date(dateRangeArr[1]);
      setValue("kegiatan", result.kegiatan);
      setValue("waktu", result.waktu);
      setStartDate(dateStart);
      setEndDate(dateEnd);
      return result;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["detailRincianKegiatanLaporanHasilPKM", anggaranId],
    queryFn: fetchDetailRincianKegiatan,
    enabled: !!anggaranId,
  });

  return { data, isLoading, refetch };
};
