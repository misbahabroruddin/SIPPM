"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetPengabdianLPPM = (search) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["listingPengabdianLPPM", search],
    queryFn: async () => {
      let params;
      if (search) {
        params = {
          judul: search,
        };
      }
      try {
        const { data } = await axios.get("/proposals/lppms/pkms", {
          params: params,
        });
        return data?.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
