"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailPengabdian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailPengabdian = async () => {
    try {
      const { data } = await axios.get(`/proposals/lppms/pkms/${id}`);

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["detailPengabdianLPPM", id],
    queryFn: fetchDetailPengabdian,
  });

  return { ...query };
};
