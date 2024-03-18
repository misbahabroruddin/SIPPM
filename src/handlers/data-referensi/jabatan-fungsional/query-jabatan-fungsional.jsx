"use client";

import { useQuery } from "@tanstack/react-query";
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
      toast.error(error.message);
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
