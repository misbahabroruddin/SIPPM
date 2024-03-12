"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetDetailLuaranWajib = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["luaran-wajib", id],
    queryFn: async () => {
      const { data } = await axios.get(`/data-referensis/luaran-wajibs/${id}`);
      return data.data;
    },
    enabled: false,
  });

  return { ...query };
};
