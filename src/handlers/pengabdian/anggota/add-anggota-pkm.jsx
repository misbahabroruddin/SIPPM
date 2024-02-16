"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddAnggotaPKM = (reset, onClose) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const handleAddNewAnggota = async (id) => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const formData = new FormData();
      formData.append("anggota_id", id);
      const { data } = await axios.post(
        `/proposals/dosen/pkms/${pengabdianId}/anggotas`,
        formData
      );
      toast.success("Anggota berhasil ditambahkan");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSelectAnggota = async (form) => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const formData = new FormData();
      formData.append("anggota_id", form.anggota_id);
      const { data } = await axios.post(
        `/proposals/dosen/pkms/${pengabdianId}/anggotas`,
        formData
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
    onError: (error) => {
      toast.error(error.message);
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
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    handleAddNewAnggota,
    onSubmitAnggotaDosenPKM,
    isLoadingAnggotaDosenPKM,
    onSubmitAnggotaMahasiswaPKM,
    isLoadingAnggotaMahasiswaPKM,
  };
};
