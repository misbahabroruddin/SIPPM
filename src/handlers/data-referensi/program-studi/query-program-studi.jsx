"use client";
import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryProgramStudi = () => {
  const axios = useAxios();
  const fetchProgramStudi = async () => {
    try {
      const { data } = await axios.get(
        "/data-referensis/program-studis/search"
      );
      const result = data.data.map((opt) => ({
        value: opt.id,
        label: opt.nama,
      }));
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["programStudiOptions"],
    queryFn: fetchProgramStudi,
  });

  return {
    data,
    isLoading,
  };
};
