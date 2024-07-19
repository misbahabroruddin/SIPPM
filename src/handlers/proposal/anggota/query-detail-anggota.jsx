"use client";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailAnggotaProposal = (anggotaId) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailAnggota = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposal/${penelitianId || pengabdianId || id}/anggotas/detail/${anggotaId}`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["detailAnggotaProposal", anggotaId],
    queryFn: fetchDetailAnggota,
  });

  return { ...query };
};
