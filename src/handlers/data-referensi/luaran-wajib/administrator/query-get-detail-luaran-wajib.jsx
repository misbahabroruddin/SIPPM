"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetDetailLuaranWajib = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["luaran-wajib", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/data-referensis/luaran-wajibs/${id}`,
        );
        return data.data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
    enabled: false,
  });

  return { ...query };
};
