"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaDosenLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaDosenPenelitian = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/anggotas?jenis_anggota=Dosen`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: listAnggotaDosenPenelitian,
    refetch: refetchAnggotaDosenPenelitan,
    isLoading: isLoadingAnggotaDosenPenelitan,
  } = useQuery({
    queryKey: ["anggotaDosenLaporanHasil"],
    queryFn: fetchAnggotaDosenPenelitian,
  });

  return {
    listAnggotaDosenPenelitian,
    refetchAnggotaDosenPenelitan,
    isLoadingAnggotaDosenPenelitan,
  };
};
