"use client";

import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRencanaAnggaran = (setValue, anggaranId) => {
  const { id } = useParams();
  const axios = useAxios();

  const fetchDetailRencanaAnggaran = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      const { data } = await axios.get(
        `/proposal/${
          penelitianId || pengabdianId || id
        }/rencana-anggarans/${anggaranId}`,
      );

      const result = data.data;
      setValue("rincian", result.rincian);
      setValue("biaya", result.biaya);

      return result;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["detailRencanaAnggaran", anggaranId],
    queryFn: fetchDetailRencanaAnggaran,
    enabled: !!anggaranId,
  });

  return { ...query };
};
