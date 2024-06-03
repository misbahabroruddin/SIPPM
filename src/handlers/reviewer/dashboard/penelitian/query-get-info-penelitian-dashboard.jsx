"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryInfoProposalPenelitianDashboardReviewer = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPenelitianReviewerDashboard"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/dashboards/reviewers/penelitians/info",
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
