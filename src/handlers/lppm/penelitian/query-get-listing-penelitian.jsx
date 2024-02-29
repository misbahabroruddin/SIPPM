"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetPenelitianLPPM = (search, page) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["listingPenelitianLPPM", search, page],
    queryFn: async () => {
      let params;
      if (search) {
        params = {
          judul: search,
        };
      }

      if (page) {
        params = {
          ...params,
          page: page,
        };
      }
      try {
        const { data } = await axios.get("/proposals/lppms/penelitians", {
          params: params,
        });
        console.log(data?.data.current_page);
        return data?.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
