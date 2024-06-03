"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useQueryInfoProposalPenelitianDashboardDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPenelitianDosenDashboard"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dashboards/dosens/penelitians/info");

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
