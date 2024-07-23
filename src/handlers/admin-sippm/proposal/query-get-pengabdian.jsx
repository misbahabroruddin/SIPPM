"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { signOut } from "next-auth/react";

export const useQueryGetPengabdianAdmin = (search, page, limit) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["list-pengabdian-admin", search, page, limit],
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

      if (limit) {
        params = {
          ...params,
          limit,
        };
      }
      try {
        const { data } = await axios.get(
          `/proposal/pengabdians/role/admin-sippm`,
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
