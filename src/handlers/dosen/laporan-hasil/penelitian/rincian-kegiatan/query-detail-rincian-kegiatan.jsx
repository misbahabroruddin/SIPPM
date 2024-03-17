"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryDetailRincianKegiatanLaporanHasilPenelitian = (
  kegiatanId,
  setStartDate,
  setEndDate,
  setValue,
) => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchDetailRincianKegiatan = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/rincian-kegiatans/${kegiatanId}`,
      );
      const result = data.data;
      const dateRangeArr = result.waktu.split(",");
      const dateStart = new Date(dateRangeArr[0]);
      const dateEnd = new Date(dateRangeArr[1]);
      setValue("kegiatan", result.kegiatan);
      setValue("waktu", result.waktu);
      setStartDate(dateStart);
      setEndDate(dateEnd);
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["detailRincianKegiatanPenelitian", kegiatanId],
    queryFn: fetchDetailRincianKegiatan,
    enabled: !!kegiatanId,
  });

  return {
    ...query,
  };
};
