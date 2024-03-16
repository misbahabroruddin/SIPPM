"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetListSKPenelitianDosen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["getSKPenelitianDosen"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/dokumens/dosens/penelitians/sks");
        return data;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return { ...query };
};
