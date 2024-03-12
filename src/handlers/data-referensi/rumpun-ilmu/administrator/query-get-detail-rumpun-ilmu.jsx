"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetDetailRumpunIlmu = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["rumpun-ilmu", id],
    queryFn: async () => {
      const { data } = await axios.get(`/data-referensis/rumpun-ilmus/${id}`);
      return data.data;
    },
    enabled: false,
  });

  return { ...query };
};
