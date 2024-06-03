"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaMahasiswa = () => {
  const axios = useAxios();

  const fetchListMahasiswa = async () => {
    try {
      const { data } = await axios.get(
        "/anggotas/search?jenis_anggota=Mahasiswa&limit=1000",
      );
      const result = data?.data.map((opt) => ({
        value: opt.id,
        label: `${opt.nama_lengkap} (${opt.nidn_or_nidk_or_nim})`,
      }));
      return result;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["listMahasiswa"],
    queryFn: fetchListMahasiswa,
  });

  return {
    data,
    isLoading,
  };
};
