"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetDetailProgramStudi = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["program-studi", id],
    queryFn: async () => {
      const { data } = await axios.get(`/data-referensis/program-studis/${id}`);
      return data.data;
    },
    enabled: false,
  });

  return { ...query };
};
