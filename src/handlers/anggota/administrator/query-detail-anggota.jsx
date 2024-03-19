"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAdministratorDetailAnggotaDosen = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["detailAnggotaAdministrator", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/anggotas/${id}`);
        return data.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
    enabled: false,
  });

  return { ...query };
};
