"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListSKPenelitianLPPM = (search, page) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getSKPenelitianLPPM", search, page],
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
        const { data } = await axios.get("/dokumens/lppms/penelitians/sks", {
          params,
        });
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
