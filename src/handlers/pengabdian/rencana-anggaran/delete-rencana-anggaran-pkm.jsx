import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRencanaAnggaranPKM = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const handleDelete = async (rencanaAnggaranId) => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.delete(
        `/proposals/dosen/pkms/${pengabdianId}/rencana-anggarans/${rencanaAnggaranId}`
      );
      toast.success("Rencana anggaran PKM berhasil dihapus");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: deleteRencanaAnggaranPKM, isPending } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rencanaAnggaranPKM"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    deleteRencanaAnggaranPKM,
    isPending,
  };
};
