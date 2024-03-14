"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryInfoProposalPenelitianDashboardDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPenelitianDosenDashboard"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dashboards/dosens/penelitians/info");

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
