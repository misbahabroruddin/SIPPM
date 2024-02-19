"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryJenisPenelitians = () => {
  const axios = useAxios();
  const fetchJenisPenelitians = async () => {
    try {
      const { data } = await axios.get(
        "/data-referensis/jenis-penelitians/search"
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

  const {
    data: jenisPenelitianOptions,
    isLoading: isLoadingJenisPenelitianOptions,
  } = useQuery({
    queryKey: ["jenisPenelitianOptions"],
    queryFn: fetchJenisPenelitians,
  });

  return {
    jenisPenelitianOptions,
    isLoadingJenisPenelitianOptions,
  };
};
