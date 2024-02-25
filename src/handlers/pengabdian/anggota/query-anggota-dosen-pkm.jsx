"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaDosenPKM = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaDosenPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${
          pengabdianId || id
        }/anggotas?jenis_anggota=Dosen`,
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
