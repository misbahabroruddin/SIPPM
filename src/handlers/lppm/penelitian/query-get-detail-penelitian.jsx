"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export const useQueryDetailPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailPenelitian = async () => {
    try {
      const { data } = await axios.get(`/proposals/lppms/penelitians/${id}`);

      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["detailPenelitianLPPM", id],
    queryFn: fetchDetailPenelitian,
  });

  return { ...query };
};
