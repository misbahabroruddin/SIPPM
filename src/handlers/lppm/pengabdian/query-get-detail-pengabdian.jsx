"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryDetailPengabdian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailPengabdian = async () => {
    try {
      const { data } = await axios.get(`/proposals/lppms/pkms/${id}`);

      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["detailPengabdianLPPM", id],
    queryFn: fetchDetailPengabdian,
  });

  return { ...query };
};
