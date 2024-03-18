"use client";
import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetDetailKabupaten = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["kabupaten", id],
    queryFn: async () => {
      const { data } = await axios.get(`/data-referensis/kabupatens/${id}`);
      return data.data;
    },
    enabled: false,
  });

  return { ...query };
};
