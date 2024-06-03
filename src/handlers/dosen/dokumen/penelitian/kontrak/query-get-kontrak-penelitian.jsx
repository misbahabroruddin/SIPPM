"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListKontrakPenelitianDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getKontrakPenelitianDosen"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/dokumens/dosens/penelitians/kontraks",
        );
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
