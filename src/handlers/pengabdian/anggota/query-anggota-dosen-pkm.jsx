"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaDosenPKM = () => {
  const axios = useAxios();

  const fetchAnggotaDosenPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosen/pkms/${pengabdianId}/anggotas?jenis_anggota=Dosen`
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
    queryKey: ["anggotaDosenPKM"],
    queryFn: fetchAnggotaDosenPKM,
  });

  return {
    listAnggotaDosenPKM,
    refetchDosen,
    isLoading,
  };
};
