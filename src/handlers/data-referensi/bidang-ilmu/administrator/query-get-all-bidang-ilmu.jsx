"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryListingBidangIlmu = (search, page) => {
  const axios = useAxios();
  const params = {
    nama: search,
    page: page,
  };

  const query = useQuery({
    queryKey: ["bidang-ilmu", search, page],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/data-referensis/bidang-ilmus", {
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
