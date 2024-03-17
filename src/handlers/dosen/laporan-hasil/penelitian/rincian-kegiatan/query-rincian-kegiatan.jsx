"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryRincianKegiatanLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchRincianKegiatan = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/rincian-kegiatans`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["rincianKegiatanLaporanHasilPenelitian"],
    queryFn: fetchRincianKegiatan,
  });

  return {
    ...query,
  };
};
