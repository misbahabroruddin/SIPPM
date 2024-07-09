"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryTrashListingKomponenPenilaian = (search, page) => {
  const axios = useAxios();
  const params = {
    rincian: search,
    page: page,
  };

  const query = useQuery({
    queryKey: ["trash-komponen-penilaian", search, page],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/data-referensi/komponen-penilaians/trashs",
          { params },
        );

        return data.data;
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
