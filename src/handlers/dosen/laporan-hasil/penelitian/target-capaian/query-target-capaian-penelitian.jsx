"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryTargetCapaianLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchTargetCapaianPenelitian = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/target-capaian`,
      );
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["targetCapaianPenelitianLaporanHasil"],
    queryFn: fetchTargetCapaianPenelitian,
  });

  return { data, refetch, isLoading };
};
