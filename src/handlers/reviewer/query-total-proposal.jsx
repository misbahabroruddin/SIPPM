"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryTotalProposalReviewer = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["totalProposalReviewer"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/proposals/totals/reviewers");

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
