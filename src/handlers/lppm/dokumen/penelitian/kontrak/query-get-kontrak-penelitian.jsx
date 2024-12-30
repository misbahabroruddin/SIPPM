"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListKontrakPenelitianLPPM = (search, page) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getKontrakPenelitianLPPM", search, page],
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
        const { data } = await axios.get(
          "/dokumens/lppms/penelitians/kontraks",
          { params },
        );
        return data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message);
      }
    },
  });

  return { ...query };
};
