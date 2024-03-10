"use client";
import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetDetailBidangIlmu = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["bidang-ilmu", id],
    queryFn: async () => {
      const { data } = await axios.get(`/data-referensis/bidang-ilmus/${id}`);
      return data.data;
    },
    enabled: false,
  });

  return { ...query };
};
