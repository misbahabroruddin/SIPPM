"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryListingLuaranWajib = (search, page) => {
  const axios = useAxios();
  const params = {
    nama: search,
    page: page,
  };

  const query = useQuery({
    queryKey: ["luaran-wajib", search, page],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/data-referensis/luaran-wajibs", {
          params,
        });

        return data.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
