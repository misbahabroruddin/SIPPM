"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetProfile = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["biodata"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/users/profile");
        return data.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...query };
};
