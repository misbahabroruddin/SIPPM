"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListKontrakPengabdianLPPM = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getKontrakPengabdianLPPM"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dokumens/lppms/pkms/kontraks");
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
