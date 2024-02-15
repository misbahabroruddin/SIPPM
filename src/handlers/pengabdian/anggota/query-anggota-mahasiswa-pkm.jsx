"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaMahasiswaPKM = () => {
  const axios = useAxios();

  const fetchAnggotaMahasiswaPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosen/pkms/${pengabdianId}/anggotas?jenis_anggota=Mahasiswa`
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
    queryKey: ["anggotaMahasiswaPKM"],
    queryFn: fetchAnggotaMahasiswaPKM,
  });

  return {
    listAnggotaMahasiswaPKM,
    refetchMahasiswa,
    isLoading,
  };
};
