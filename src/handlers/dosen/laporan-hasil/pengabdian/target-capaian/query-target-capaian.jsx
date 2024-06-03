"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryTargetCapaianLaporanHasilPKM = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchTargetCapaianPKM = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/target-capaian`,
      );
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["targetCapaianLaporanHasilPKM"],
    queryFn: fetchTargetCapaianPKM,
  });

  return { ...query };
};
