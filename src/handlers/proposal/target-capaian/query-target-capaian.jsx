"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryTargetCapaianProposal = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchTargetCapaian = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      const { data } = await axios.get(
        `/proposal/${penelitianId || pengabdianId || id}/target-capaian`,
      );

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["targetCapaian"],
    queryFn: fetchTargetCapaian,
  });

  return { ...query };
};
