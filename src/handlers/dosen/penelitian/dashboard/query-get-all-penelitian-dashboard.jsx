"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetAllPenelitianDashboardDosen = (search, page) => {
  const axios = useAxios();
  const query = useQuery({
    queryKey: ["listPenelitianDashboardDosen", search, page],
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
        const { data } = await axios.get(`/dashboards/dosens/penelitians`, {
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
