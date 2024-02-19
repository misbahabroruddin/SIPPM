"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaMahasiswaPKM = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();
  const pengabdianId = localStorage.getItem("pengabdianId");

  const fetchDetailAnggotaMahasiswa = async () => {
    try {
      const { data } = await axios.get(
        `/proposals/dosen/pkms/${pengabdianId || id}/anggotas/${anggotaId}`
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
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
