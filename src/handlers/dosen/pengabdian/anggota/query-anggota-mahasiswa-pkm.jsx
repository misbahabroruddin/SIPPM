"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaMahasiswaPKM = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaMahasiswaPKM = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${
          pengabdianId || id
        }/anggotas?jenis_anggota=Mahasiswa`,
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
