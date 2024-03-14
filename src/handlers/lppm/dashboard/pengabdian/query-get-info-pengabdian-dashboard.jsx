"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryInfoProposalPengabdianDashboardLPPM = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPengabdianLPPMDashboard"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dashboards/lppms/pkms/info");

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
