"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useQueryIdentitasUsulanPenelitian = (setValue) => {
  const axios = useAxios();
  const { id } = useParams();
  const { setCurrentStep } = useStep();

  const fetchIdentitasUsulanPenelitian = async () => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const step = localStorage.getItem("step");
      const { data } = await axios.get(
        `proposals/dosen/penelitians/${penelitianId || id}/identitas-usulans`
      );
      setValue("judul_penelitian", data?.data.judul_penelitian);
      setValue("jenis_penelitian_id", data?.data.jenis_penelitian.id, {
        shouldValidate: true,
      });
      setValue("rumpun_ilmu_id", data?.data.rumpun_ilmu.id, {
        shouldValidate: true,
      });
      setValue("bidang_fokus_penelitian", data?.data.bidang_fokus_penelitian);
      setValue("tahun_usulan", data?.data.tahun_usulan);
      setValue("jangka_waktu_penelitian", data?.data.jangka_waktu_penelitian);
      setValue("ringkasan_penelitian", data?.data.ringkasan_penelitian);
      localStorage.setItem("step", 1);
      localStorage.setItem("isEdit", true);
      if (!step) setCurrentStep(1);
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: identitasUsulanPenelitian,
    isLoading: isLoadingIdentitasUsulanPenelitian,
    refetch: refecthIdentitasUsulanPenelitian,
  } = useQuery({
    queryKey: ["identitas-usulan-penelitian"],
    queryFn: fetchIdentitasUsulanPenelitian,
    enabled: false,
  });

  return {
    identitasUsulanPenelitian,
    isLoadingIdentitasUsulanPenelitian,
    refecthIdentitasUsulanPenelitian,
  };
};
