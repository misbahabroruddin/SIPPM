"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRincianKegiatanPKM = (
  setValue,
  setStartDate,
  setEndDate,
  id
) => {
  const axios = useAxios();

  const fetchDetailRincianKegiatan = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosen/pkms/${pengabdianId}/rincian-kegiatans/${id}`
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
      throw new Error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["detailRincianKegiatanPKM", id],
    queryFn: fetchDetailRincianKegiatan,
  });

  return { data, isLoading, refetch };
};
