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
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });

  return { ...query };
};
