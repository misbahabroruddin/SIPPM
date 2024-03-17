"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryIdentitasUsulanLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchIdentitasUsulanPenelitian = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/penelitians/${id}/identitas-usulan`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: identitasUsulanPenelitian,
    isLoading: isLoadingIdentitasUsulanPenelitian,
    refetch: refecthIdentitasUsulanPenelitian,
  } = useQuery({
    queryKey: ["identitas-usulan-laporan-hasil-penelitian"],
    queryFn: fetchIdentitasUsulanPenelitian,
  });

  return {
    identitasUsulanPenelitian,
    isLoadingIdentitasUsulanPenelitian,
    refecthIdentitasUsulanPenelitian,
  };
};
