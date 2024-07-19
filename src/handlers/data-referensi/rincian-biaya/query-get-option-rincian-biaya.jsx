"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRincianBiayaOptions = () => {
  const axios = useAxios();
  const fetchRincianBiaya = async () => {
    try {
      const { data } = await axios.get("/data-referensi/rincian-biayas/search");
      const result = data.data.map((opt) => ({
        value: opt.id,
        label: opt.rincian,
        anggaran: opt.anggaran,
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
    queryKey: ["rincianBiayaOptions"],
    queryFn: fetchRincianBiaya,
  });

  return {
    ...query,
  };
};
