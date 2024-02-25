"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useQueryDetailPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchDetailPenelitian = async () => {
    try {
      const { data } = await axios.get(`/lppms/penelitians/${id}`);
    } catch (error) {}
  };
};
