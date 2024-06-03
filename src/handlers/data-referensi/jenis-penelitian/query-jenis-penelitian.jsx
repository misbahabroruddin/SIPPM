"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryJenisPenelitians = () => {
  const axios = useAxios();
  const fetchJenisPenelitians = async () => {
    try {
      const { data } = await axios.get(
        "/data-referensis/jenis-penelitians/search",
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
