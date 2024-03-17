"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListSKPengabdianLPPM = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getSKPengabdianLPPM"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dokumens/lppms/pkms/sks");
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
