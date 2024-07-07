"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetDetailBidangIlmu = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["bidang-ilmu", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/data-referensi/bidang-ilmus/${id}`);
        return data.data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
    enabled: false,
  });

  return { ...query };
};
