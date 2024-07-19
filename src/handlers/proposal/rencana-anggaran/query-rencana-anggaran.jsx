"use client";

import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryRencanaAnggaran = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchRencanaAnggaran = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      const { data } = await axios.get(
        `/proposal/${penelitianId || pengabdianId || id}/rencana-anggarans`,
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
    queryKey: ["rencanaAnggaran"],
    queryFn: fetchRencanaAnggaran,
  });

  return { ...query };
};
