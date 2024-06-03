"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaDosenLaporanHasilPKM = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailAnggotaDosen = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/anggotas/${anggotaId}`,
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
    queryKey: ["detailAnggotaDosenLaporanHasilPKM", anggotaId],
    queryFn: fetchDetailAnggotaDosen,
    enabled: !!anggotaId,
  });

  return { ...query };
};
