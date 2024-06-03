"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaMahasiswaPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaMahasiswaPenelitian = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.get(
        `proposals/dosens/penelitians/${
          penelitianId || id
        }/anggotas?jenis_anggota=Mahasiswa`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const {
    data: listAnggotaMahasiswaPenelitian,
    refetch: refetchAnggotaMahasiswaPenelitan,
    isLoading: isLoadingAnggotaMahasiswaPenelitan,
  } = useQuery({
    queryKey: ["anggotaMahasiswa"],
    queryFn: fetchAnggotaMahasiswaPenelitian,
  });

  return {
    listAnggotaMahasiswaPenelitian,
    refetchAnggotaMahasiswaPenelitan,
    isLoadingAnggotaMahasiswaPenelitan,
  };
};
