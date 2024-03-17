"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListSKPengabdianDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getSKPengabdianDosen"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dokumens/dosens/pkms/sks");
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
