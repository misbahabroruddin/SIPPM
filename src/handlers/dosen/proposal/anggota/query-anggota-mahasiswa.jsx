"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaMahasiswaProposal = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaMahasiswa = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposal/${
          penelitianId || pengabdianId || id
        }/anggotas?jenis_anggota=Mahasiswa`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["anggotaMahasiswa"],
    queryFn: fetchAnggotaMahasiswa,
  });

  return {
    ...query,
  };
};
