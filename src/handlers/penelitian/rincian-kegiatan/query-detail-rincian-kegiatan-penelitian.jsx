"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryDetailRincianKegiatanPenelitian = (
  kegiatanId,
  setStartDate,
  setEndDate,
  setValue,
) => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchDetailRincianKegiatan = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.get(
        `/proposals/dosens/penelitians/${
          penelitianId || id
        }/rincian-kegiatans/${kegiatanId}`,
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
      toast.error(error.message);
    }
  };

  const {
    data: detailRincianKegiatanPenelitian,
    isLoading: isLoadingDetailRincianKegiatan,
    refetch: refetchDetailRincianKegiatan,
  } = useQuery({
    queryKey: ["detailRincianKegiatanPenelitian", kegiatanId],
    queryFn: fetchDetailRincianKegiatan,
    enabled: !!kegiatanId,
  });

  return {
    detailRincianKegiatanPenelitian,
    isLoadingDetailRincianKegiatan,
    refetchDetailRincianKegiatan,
  };
};
