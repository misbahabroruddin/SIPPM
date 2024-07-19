"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListKontrakLppm = (jenisProposal) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["dokumen-kontrak-lppm"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/dokumen/kontraks/role/lppm?proposal=${jenisProposal}`,
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
