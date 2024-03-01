"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryTotalProposalDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["totalProposalDosen"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/proposals/totals/dosens");

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
