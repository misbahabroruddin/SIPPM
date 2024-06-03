"use client";

import { signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetDetailRumpunIlmu = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["rumpun-ilmu", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/data-referensis/rumpun-ilmus/${id}`);
        return data.data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }

        toast.error(error.response.data.message || "Something went wrong");
      }
    },
    enabled: false,
  });

  return { ...query };
};
