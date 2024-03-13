"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetPenelitianReviewer = (search, page) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["listingPenelitianReviewer", search, page],
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
        const { data } = await axios.get("/proposals/reviewers/penelitians", {
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
