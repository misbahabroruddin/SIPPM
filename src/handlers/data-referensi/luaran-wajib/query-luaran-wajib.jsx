"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { signOut } from "next-auth/react";

export const useQueryLuaranWajib = () => {
  const axios = useAxios();
  const fetchLuaranWajibOptions = async () => {
    try {
      const { data } = await axios.get("/data-referensi/luaran-wajibs/search");
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

  const { data, isLoading } = useQuery({
    queryKey: ["luaran-wajib-options"],
    queryFn: fetchLuaranWajibOptions,
  });

  return {
    data,
    isLoading,
  };
};
