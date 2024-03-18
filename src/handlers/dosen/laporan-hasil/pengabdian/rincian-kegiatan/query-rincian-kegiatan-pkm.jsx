"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRincianKegiatanLaporanHasilPKM = () => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchRincianKegiatan = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/rincian-kegiatans`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["rincianKegiatanLaporanHasilPKM"],
    queryFn: fetchRincianKegiatan,
  });

  return { ...query };
};
