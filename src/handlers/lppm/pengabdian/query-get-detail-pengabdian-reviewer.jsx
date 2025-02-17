"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailPengabdianReviewer = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailPengabdian = async () => {
    try {
      const { data } = await axios.get(`/proposals/reviewers/pkms/${id}`);

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["detailPengabdianReviewer", id],
    queryFn: fetchDetailPengabdian,
  });

  return { ...query };
};
