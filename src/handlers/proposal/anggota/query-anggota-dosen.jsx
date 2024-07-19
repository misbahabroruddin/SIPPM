"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAnggotaDosenProposal = () => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchAnggotaDosen = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(
        `/proposal/${
          penelitianId || pengabdianId || id
        }/anggotas?jenis_anggota=Dosen`,
      );
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["anggotaDosen"],
    queryFn: fetchAnggotaDosen,
  });

  return {
    ...query,
  };
};
