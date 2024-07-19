"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryLaporanHasilReviewer = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchLaporanHasil = async () => {
    try {
      const { data } = await axios.get(`/laporan-hasils/${id}`);

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["laporan-hasil-reviewer"],
    queryFn: fetchLaporanHasil,
  });

  return { ...query };
};
