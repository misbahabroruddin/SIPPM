"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetPengabdianReviewer = (search, page, limit) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["listingPengabdianReviewer", search, page, limit],
    queryFn: async () => {
      let params;
      if (search) {
        params = {
          judul: search,
          limit,
        };
      }
      if (page) {
        params = {
          ...params,
          page: page,
        };
      }
      try {
        const { data } = await axios.get(
          "/proposal/pengabdians/role/reviewer",
          {
            params: params,
          },
        );
        return data?.data;
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
