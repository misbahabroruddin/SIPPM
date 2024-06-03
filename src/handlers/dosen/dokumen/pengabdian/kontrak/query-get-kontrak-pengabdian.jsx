"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListKontrakPengabdianDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getKontrakPengabdianDosen"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dokumens/dosens/pkms/kontraks");
        return data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });

  return { ...query };
};
