"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQuerySearchKabupaten = () => {
  const axios = useAxios();
  const fetchSearchKabupaten = async () => {
    try {
      const { data } = await axios.get(
        "/data-referensis/kabupatens/search?limit=1000",
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
    queryKey: ["kabupatenOptions"],
    queryFn: fetchSearchKabupaten,
  });

  return {
    data,
    isLoading,
  };
};
