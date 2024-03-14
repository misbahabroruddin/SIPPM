"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryInfoProposalPengabdianDashboardDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPengabdianDosenDashboard"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dashboards/dosens/pkms/info");

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
