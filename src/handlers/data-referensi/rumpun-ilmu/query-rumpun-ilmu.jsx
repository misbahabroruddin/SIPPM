"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRumpunIlmu = () => {
  const axios = useAxios();

  const fetchRumpunIlmu = async () => {
    try {
      const { data } = await axios.get(
        "/data-referensis/rumpun-ilmus/search?limit=1000",
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
