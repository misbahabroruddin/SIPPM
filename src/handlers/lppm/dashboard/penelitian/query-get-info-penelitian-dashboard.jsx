"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryInfoProposalPenelitianDashboardLPPM = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPenelitianLPPMDashboard"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dashboards/lppms/penelitians/info");

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
