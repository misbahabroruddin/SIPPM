"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaMahasiswaLaporanHasilPKM = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailAnggotaMahasiswa = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/anggotas/${anggotaId}`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["detailAnggotaMahasiswaLaporanHasilPKM", anggotaId],
    queryFn: fetchDetailAnggotaMahasiswa,
    enabled: !!anggotaId,
  });

  return { ...query };
};
