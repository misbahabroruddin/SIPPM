"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaDosen = () => {
  const axios = useAxios();

  const fetchListDosen = async () => {
    try {
      const { data } = await axios.get("/anggotas/search?jenis_anggota=Dosen");
      const result = data?.data.map((opt) => ({
        value: opt.id,
        label: `${opt.nama_lengkap} (${opt.nidn_or_nidk_or_nim})`,
      }));
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["listDosen"],
    queryFn: fetchListDosen,
  });

  return {
    data,
    isLoading,
  };
};
