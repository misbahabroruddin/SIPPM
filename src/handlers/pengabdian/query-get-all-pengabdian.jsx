"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetAllPengabdian = (search) => {
  const axios = useAxios();
  const query = useQuery({
    queryKey: ["listPengabdian", search],
    queryFn: async () => {
      let params;
      if (search) {
        params = {
          judul_pkm: search,
        };
      }
      try {
        const { data } = await axios.get("/proposals/dosen/pkms", {
          params: params,
        });
        return data.data.data;
      } catch (error) {
        toast.error(error.message);
        a8;
      }
    },
  });
  return { ...query };
};
