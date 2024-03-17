"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListLaporanHasilPengabdian = (search, page) => {
  const axios = useAxios();
  const query = useQuery({
    queryKey: ["listLaporanHasilPengabdian", search, page],
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
        const { data } = await axios.get(`/laporan-hasils/dosens/pkms`, {
          params: params,
        });

        return data.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
