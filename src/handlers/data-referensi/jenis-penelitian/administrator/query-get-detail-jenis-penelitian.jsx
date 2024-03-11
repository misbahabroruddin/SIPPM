"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetDetailJenisPenelitian = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["jenis-penelitian", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/data-referensis/jenis-penelitians/${id}`,
      );
      return data.data;
    },
    enabled: false,
  });

  return { ...query };
};
