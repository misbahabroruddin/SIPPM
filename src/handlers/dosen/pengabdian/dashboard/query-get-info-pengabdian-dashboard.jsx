"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryInfoProposalPengabdianDashboardDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPengabdianDosenDashboard"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/proposal/pengabdians/statistik/role/dosen",
        );

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
