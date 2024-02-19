"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRumpunIlmu = () => {
  const axios = useAxios();

  const fetchRumpunIlmu = async () => {
    try {
      const { data } = await axios.get("/data-referensis/rumpun-ilmus/search");
      const result = data?.data.map((opt) => ({
        value: opt.id,
        label: opt.nama,
      }));
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["rumpun-ilmu"],
    queryFn: fetchRumpunIlmu,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
