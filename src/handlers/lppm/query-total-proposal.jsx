"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryTotalProposalLPPM = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["totalProposalLPPM"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/proposals/totals/lppms");

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
