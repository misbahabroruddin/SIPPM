"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
