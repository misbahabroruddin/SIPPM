"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaDosenPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaDosenPenelitian = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.get(
        `proposals/dosens/penelitians/${
          penelitianId || id
        }/anggotas?jenis_anggota=Dosen`,
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
    queryKey: ["anggotaDosen"],
    queryFn: fetchAnggotaDosenPenelitian,
  });

  return {
    listAnggotaDosenPenelitian,
    refetchAnggotaDosenPenelitan,
    isLoadingAnggotaDosenPenelitan,
  };
};
