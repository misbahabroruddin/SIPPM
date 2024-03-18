"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaDosenLaporanHasilPKM = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaDosenPKM = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/anggotas?jenis_anggota=Dosen`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: listAnggotaDosenPKM,
    refetch: refetchDosen,
    isLoading,
  } = useQuery({
    queryKey: ["anggotaDosenLaporanHasilPKM"],
    queryFn: fetchAnggotaDosenPKM,
  });

  return {
    listAnggotaDosenPKM,
    refetchDosen,
    isLoading,
  };
};
