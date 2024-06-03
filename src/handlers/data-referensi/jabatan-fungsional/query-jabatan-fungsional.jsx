"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryJabatanFungsional = () => {
  const axios = useAxios();
  const fetchJabatanFungsional = async () => {
    try {
      const { data } = await axios.get(
        "/data-referensis/jabatan-fungsionals/search?limit=1000",
      );
      const result = data.data.map((opt) => ({
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

  const { data, isLoading } = useQuery({
    queryKey: ["jabatanFungsionalOptions"],
    queryFn: fetchJabatanFungsional,
  });

  return {
    data,
    isLoading,
  };
};
