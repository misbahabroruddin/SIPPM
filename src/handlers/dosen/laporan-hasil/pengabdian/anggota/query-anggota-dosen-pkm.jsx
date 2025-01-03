"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
