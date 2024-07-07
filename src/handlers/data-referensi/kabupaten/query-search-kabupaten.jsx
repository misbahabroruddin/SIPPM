"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQuerySearchKabupaten = () => {
  const axios = useAxios();
  const fetchSearchKabupaten = async () => {
    try {
      const { data } = await axios.get(
        "/data-referensi/kabupatens/search?limit=1000",
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
    queryKey: ["kabupatenOptions"],
    queryFn: fetchSearchKabupaten,
  });

  return {
    data,
    isLoading,
  };
};
