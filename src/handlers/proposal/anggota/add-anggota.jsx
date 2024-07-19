"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddAnggotaProposal = (reset, onClose) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const penelitianId = localStorage.getItem("penelitianId");
  const pengabdianId = localStorage.getItem("pengabdianId");
  const { id } = useParams();

  const handleAddNewAnggota = async (anggotaId) => {
    try {
      const formData = new FormData();
      formData.append("anggota_id", anggotaId);
      const { data } = await axios.post(
        `/proposal/${penelitianId || pengabdianId || id}/anggotas`,
        formData,
      );
      toast.success("Anggota berhasil ditambahkan");
      return data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const onSelectAnggotaProposal = async (form) => {
    try {
      const formData = new FormData();
      formData.append("anggota_id", form.anggota_id);
      const { data } = await axios.post(
        `/proposal/${penelitianId || pengabdianId || id}/anggotas`,
        formData,
      );
      reset();
      return data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const {
    mutateAsync: onSubmitAnggotaDosen,
    isPending: isLoadingAnggotaDosen,
  } = useMutation({
    mutationFn: onSelectAnggotaProposal,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["anggotaDosen"] });
        onClose();
        toast.success("Anggota dosen berhasil ditambahkan");
      }
    },
  });

  const {
    mutateAsync: onSubmitAnggotaMahasiswa,
    isPending: isLoadingAnggotaMahasiswa,
  } = useMutation({
    mutationFn: onSelectAnggotaProposal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggotaMahasiswa"] });
      onClose();
      toast.success("Anggota mahasiswa berhasil ditambahkan");
    },
  });

  return {
    handleAddNewAnggota,
    onSubmitAnggotaDosen,
    isLoadingAnggotaDosen,
    onSubmitAnggotaMahasiswa,
    isLoadingAnggotaMahasiswa,
  };
};
