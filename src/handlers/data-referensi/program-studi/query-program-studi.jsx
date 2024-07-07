"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryProgramStudi = () => {
  const axios = useAxios();
  const fetchProgramStudi = async () => {
    try {
      const { data } = await axios.get("/data-referensi/program-studis/search");
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
    queryKey: ["programStudiOptions"],
    queryFn: fetchProgramStudi,
  });

  return {
    data,
    isLoading,
  };
};
