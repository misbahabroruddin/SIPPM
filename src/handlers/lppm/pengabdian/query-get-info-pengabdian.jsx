"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryInfoProposalPengabdianLPPM = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPengabdianLPPM"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/proposals/lppms/pkms/info");

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
