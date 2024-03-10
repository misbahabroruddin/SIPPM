"use client";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetDetailJabatanFungsional = (id) => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["jabatan-fungsional", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/data-referensis/jabatan-fungsionals/${id}`,
      );
      return data.data;
    },
    enabled: false,
  });

  return { ...query };
};
