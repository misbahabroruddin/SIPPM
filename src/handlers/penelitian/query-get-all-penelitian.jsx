"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetAllPenelitian = () => {
  const axios = useAxios();
  const query = useQuery({
    queryKey: ["listPenelitian"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/proposals/dosen/penelitians");
        return data.data.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  return { ...query };
};
