"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryKriteriaPenilaian = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["kriteria-penilaian-options"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/data-referensi/kriteria-penilaians/search?limit=1000",
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
    },
  });

  return { ...query };
};
