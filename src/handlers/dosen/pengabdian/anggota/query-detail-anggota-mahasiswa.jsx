"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaMahasiswaPKM = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();
  const pengabdianId = localStorage.getItem("pengabdianId");

  const fetchDetailAnggotaMahasiswa = async () => {
    try {
      const { data } = await axios.get(
        `/proposals/dosens/pkms/${pengabdianId || id}/anggotas/${anggotaId}`,
      );
      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { data: detail, isLoading } = useQuery({
    queryKey: ["detailAnggotaMahasiswaPKM", anggotaId],
    queryFn: fetchDetailAnggotaMahasiswa,
  });

  return {
    detail,
    isLoading,
  };
};
