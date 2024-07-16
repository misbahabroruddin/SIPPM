"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailPenelitian = async () => {
    try {
      const { data } = await axios.get(`/proposal/penelitians/detail/${id}`);

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["detailPenelitianLPPM", id],
    queryFn: fetchDetailPenelitian,
  });

  return { ...query };
};
