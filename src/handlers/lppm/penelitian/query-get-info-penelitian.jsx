"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryInfoProposalPenelitianLPPM = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPenelitianLPPM"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/proposals/lppms/penelitians/info");

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
