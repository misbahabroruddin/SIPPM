"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddAnggotaPKM = (reset, onClose) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const pengabdianId = localStorage.getItem("pengabdianId");
  const { id } = useParams();

  const handleAddNewAnggotaPKM = async (anggotaId) => {
    try {
      const formData = new FormData();
      formData.append("anggota_id", anggotaId);
      const { data } = await axios.post(
        `/proposals/dosens/pkms/${pengabdianId || id}/anggotas`,
        formData,
      );
      toast.success("Anggota berhasil ditambahkan");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSelectAnggota = async (form) => {
    try {
      const formData = new FormData();
      formData.append("anggota_id", form.anggota_id);
      const { data } = await axios.post(
        `/proposals/dosens/pkms/${pengabdianId || id}/anggotas`,
        formData,
      );
      reset();
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: onSubmitAnggotaDosenPKM,
    isPending: isLoadingAnggotaDosenPKM,
  } = useMutation({
    mutationFn: onSelectAnggota,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggotaDosenPKM"] });
      onClose();
      toast.success("Anggota dosen berhasil ditambahkan");
    },
  });

  const {
    mutateAsync: onSubmitAnggotaMahasiswaPKM,
    isPending: isLoadingAnggotaMahasiswaPKM,
  } = useMutation({
    mutationFn: onSelectAnggota,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggotaMahasiswaPKM"] });
      onClose();
      toast.success("Anggota mahasiswa berhasil ditambahkan");
    },
  });

  return {
    handleAddNewAnggotaPKM,
    onSubmitAnggotaDosenPKM,
    isLoadingAnggotaDosenPKM,
    onSubmitAnggotaMahasiswaPKM,
    isLoadingAnggotaMahasiswaPKM,
  };
};
