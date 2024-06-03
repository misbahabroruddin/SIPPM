"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryRincianKegiatanPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchRincianKegiatan = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.get(
        `/proposals/dosens/penelitians/${penelitianId || id}/rincian-kegiatans`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const {
    data: rincianKegiatanPenelitian,
    isLoading: isLoadingRincianKegiatanPenelitian,
    refetch: refetchRincianKegiatanPenelitian,
  } = useQuery({
    queryKey: ["rincianKegiatanPenelitian"],
    queryFn: fetchRincianKegiatan,
  });

  return {
    rincianKegiatanPenelitian,
    isLoadingRincianKegiatanPenelitian,
    refetchRincianKegiatanPenelitian,
  };
};
