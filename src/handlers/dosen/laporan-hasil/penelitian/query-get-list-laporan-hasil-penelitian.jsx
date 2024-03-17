"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListLaporanHasilPenelitian = (search, page) => {
  const axios = useAxios();
  const query = useQuery({
    queryKey: ["listLaporanHasilPenelitian", search, page],
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
        const { data } = await axios.get(`/laporan-hasils/dosens/penelitians`, {
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
