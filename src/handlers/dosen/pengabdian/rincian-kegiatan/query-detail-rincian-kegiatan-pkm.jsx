"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryDetailRincianKegiatanPKM = (
  setValue,
  setStartDate,
  setEndDate,
  anggaranId,
) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailRincianKegiatan = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${
          pengabdianId || id
        }/rincian-kegiatans/${anggaranId}`,
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
    queryKey: ["detailRincianKegiatanPKM", anggaranId],
    queryFn: fetchDetailRincianKegiatan,
    enabled: !!anggaranId,
  });

  return { data, isLoading, refetch };
};
