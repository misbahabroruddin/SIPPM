"use client";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddEditRincianKegiatan = (
  kegiatanId,
  setStartDate,
  setEndDate,
  reset,
  onClose,
) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    console.log(form.waktu[0]);
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      const formData = new FormData();

      formData.append("kegiatan", form.kegiatan);
      formData.append(
        "tanggal_awal",
        form?.waktu[0]?.toLocaleDateString("fr-CA"),
      );
      formData.append(
        "tanggal_akhir",
        form?.waktu[1]?.toLocaleDateString("fr-CA"),
      );

      if (kegiatanId) {
        const { data } = await axios.put(
          `/proposal/${
            penelitianId || pengabdianId || id
          }/rincian-kegiatans/update/${kegiatanId}`,
          {
            kegiatan: form?.kegiatan,
            tanggal_awal: form?.waktu[0]?.toLocaleDateString("fr-CA"),
            tanggal_akhir: form?.waktu[1]?.toLocaleDateString("fr-CA"),
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );
        toast.success("Rincian kegiatan berhasil diubah");
        return data;
      } else {
        const { data } = await axios.post(
          `/proposal/${penelitianId || pengabdianId || id}/rincian-kegiatans`,
          formData,
        );
        reset();
        toast.success("Rincian kegiatan berhasil ditambah");
        return data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["rincianKegiatan"],
        });
        queryClient.invalidateQueries({
          queryKey: ["detailRincianKegiatan", kegiatanId],
        });
        setStartDate();
        setEndDate();
        onClose();
      }
    },
  });

  return {
    ...mutate,
  };
};
