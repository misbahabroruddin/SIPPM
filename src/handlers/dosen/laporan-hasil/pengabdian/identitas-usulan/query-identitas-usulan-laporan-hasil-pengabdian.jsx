"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

export const useQueryIdentitasUsulanLaporanHasilPKM = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchIdentitasUsulan = async () => {
    try {
      const { data } = await axios.get(
        `/laporan-hasils/dosens/pkms/${id}/identitas-usulan`,
      );

      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["identitas-usulan-pkm-laporan-hasil"],
    queryFn: fetchIdentitasUsulan,
  });

  return {
    ...query,
  };
};
