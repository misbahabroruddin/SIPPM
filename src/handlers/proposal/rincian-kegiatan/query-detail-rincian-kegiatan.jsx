"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailRincianKegiatan = (
  kegiatanId,
  setStartDate,
  setEndDate,
  setValue,
) => {
  const axios = useAxios();
  const { id } = useParams();
  const fetchDetailRincianKegiatan = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposal/${penelitianId || pengabdianId || id}/rincian-kegiatans/detail/${kegiatanId}`,
      );
      const result = data.data;
      const dateStart = new Date(result.tanggal_awal);
      const dateEnd = new Date(result.tanggal_akhir);

      setValue("kegiatan", result.kegiatan);
      setValue("tanggal_awal", result.tanggal_awal);
      setValue("tanggal_akhir", result.tanggal_akhir);

      setStartDate(dateStart);
      setEndDate(dateEnd);
      return result;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["detailRincianKegiatan", kegiatanId],
    queryFn: fetchDetailRincianKegiatan,
    enabled: !!kegiatanId,
  });

  return {
    ...query,
  };
};
