"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetAllPengabdian = () => {
  const axios = useAxios();
  const query = useQuery({
    queryKey: ["listPengabdian"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/proposals/dosen/pkms");
        return data.data.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  return { ...query };
};
