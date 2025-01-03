"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListSKPenelitianLPPM = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getSKPenelitianLPPM"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dokumens/lppms/penelitians/sks");
        return data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message);
      }
    },
  });

  return { ...query };
};
