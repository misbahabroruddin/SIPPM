"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { notFound, useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetRiwayatVerikasiReviewerLppm = () => {
  const axios = useAxios();
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["verfikasiReviewerLppm", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/proposal/${id}/verifikasi-lppms`);
        return data.data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });

  // if (query.status === "error") return notFound();

  return {
    ...query,
  };
};
