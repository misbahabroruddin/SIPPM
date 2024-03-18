"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaMahasiswaLaporanHasilPKM = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaMahasiswaPKM = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/anggotas?jenis_anggota=Mahasiswa`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: listAnggotaMahasiswaPKM,
    refetch: refetchMahasiswa,
    isLoading,
  } = useQuery({
    queryKey: ["anggotaMahasiswaLaporanHasilPKM"],
    queryFn: fetchAnggotaMahasiswaPKM,
  });

  return {
    listAnggotaMahasiswaPKM,
    refetchMahasiswa,
    isLoading,
  };
};
