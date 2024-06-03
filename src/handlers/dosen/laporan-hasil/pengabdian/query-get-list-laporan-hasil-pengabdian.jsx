"use client";

import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

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
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });

  return { ...query };
};
