"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryLuaranWajib = () => {
  const axios = useAxios();
  const fetchLuaranWajibOptions = async () => {
    try {
      const { data } = await axios.get("/data-referensis/luaran-wajibs/search");
      const result = data?.data.map((opt) => ({
        value: opt.id,
        label: opt.nama,
      }));
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["luaranWajibOptions"],
    queryFn: fetchLuaranWajibOptions,
  });

  return {
    data,
    isLoading,
  };
};
