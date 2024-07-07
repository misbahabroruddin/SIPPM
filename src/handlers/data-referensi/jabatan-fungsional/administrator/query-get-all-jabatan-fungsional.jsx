"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryListingJabatanFungsional = (search, page) => {
  const axios = useAxios();
  const params = {
    nama: search,
    page: page,
  };

  const query = useQuery({
    queryKey: ["jabatan-fungsional", search, page],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/data-referensi/jabatan-fungsionals",
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
