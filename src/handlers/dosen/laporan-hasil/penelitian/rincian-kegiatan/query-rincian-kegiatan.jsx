"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryRincianKegiatanLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchRincianKegiatan = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/rincian-kegiatans`,
      );
      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["rincianKegiatanLaporanHasilPenelitian"],
    queryFn: fetchRincianKegiatan,
  });

  return {
    ...query,
  };
};
