"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddEditRincianKegiatanPKM = (
  setStartDate,
  setEndDate,
  id,
  reset,
  onClose
) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const onSubmit = async (form) => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const formData = new FormData();
      formData.append("kegiatan", form.kegiatan);
      formData.append("waktu", form.waktu);

      if (id) {
        let waktu;
        if (Array.isArray(form.waktu)) {
          waktu = `${form.waktu[0]}, ${form.waktu[1]}`;
        } else {
          waktu = form.waktu;
        }

        const { data } = await axios.put(
          `/proposals/dosen/pkms/${pengabdianId}/rincian-kegiatans/${id}`,
          {
            kegiatan: form.kegiatan,
            waktu,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        toast.success("Rincian kegiatan berhasil diubah");
        return data;
      } else {
        const { data } = await axios.post(
          `/proposals/dosen/pkms/${pengabdianId}/rincian-kegiatans`,
          formData
        );
        toast.success("Rincian kegiatan berhasil ditambah");
        reset();
        return data;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: addEditRincianKegiatan, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rincianKegiatanPKM"] });
      queryClient.invalidateQueries({
        queryKey: ["detailRincianKegiatanPKM", id],
      });
      reset();
      setStartDate();
      setEndDate(null);
      onClose();
    },
  });

  return {
    addEditRincianKegiatan,
    isPending,
  };
};
