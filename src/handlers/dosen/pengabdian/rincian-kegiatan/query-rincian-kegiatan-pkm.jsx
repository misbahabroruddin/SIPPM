"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRincianKegiatanPKM = () => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchRincianKegiatan = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${pengabdianId || id}/rincian-kegiatans`,
      );
      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["rincianKegiatanPKM"],
    queryFn: fetchRincianKegiatan,
  });

  return { data, refetch };
};
