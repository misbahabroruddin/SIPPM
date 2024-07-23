"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryCatatanReviewer = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchCatatan = async () => {
    try {
      const { data } = await axios.get(`/laporan-hasils/${id}/catatan`);

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["catatan-reviewer"],
    queryFn: fetchCatatan,
  });

  return { ...query };
};
