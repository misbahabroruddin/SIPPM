"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaMahasiswaLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaMahasiswaPenelitian = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/anggotas?jenis_anggota=Mahasiswa`,
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
    data: listAnggotaMahasiswaPenelitian,
    refetch: refetchAnggotaMahasiswaPenelitan,
    isLoading: isLoadingAnggotaMahasiswaPenelitan,
  } = useQuery({
    queryKey: ["anggotaMahasiswaLaporanHasil"],
    queryFn: fetchAnggotaMahasiswaPenelitian,
  });

  return {
    listAnggotaMahasiswaPenelitian,
    refetchAnggotaMahasiswaPenelitan,
    isLoadingAnggotaMahasiswaPenelitan,
  };
};
