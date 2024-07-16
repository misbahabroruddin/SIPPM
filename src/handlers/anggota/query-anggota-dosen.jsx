"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryOptionsAnggotaDosen = () => {
  const axios = useAxios();

  const fetchListDosen = async () => {
    try {
      const { data } = await axios.get(
        "/anggotas/search?jenis_anggota=Dosen&limit=1000",
      );
      const result = data?.data.map((opt) => ({
        value: opt.id,
        label: opt.nama,
      }));
      return result;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  const query = useQuery({
    queryKey: ["listDosen"],
    queryFn: fetchListDosen,
  });

  return {
    ...query,
  };
};
