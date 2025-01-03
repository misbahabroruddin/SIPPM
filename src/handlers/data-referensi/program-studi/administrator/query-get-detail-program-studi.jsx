"use client";

import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetDetailProgramStudi = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["program-studi", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/data-referensis/program-studis/${id}`,
        );
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
