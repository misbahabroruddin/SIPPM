"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryInfoProposalPengabdianReviewer = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["infoProposalPengabdianReviewer"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/proposals/reviewers/pkms/info");

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
