"use client";

import Image from "next/image";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { Input } from "@/components/input/input";
import { useQueryDetailAnggotaProposal } from "@/handlers/dosen/proposal/anggota/query-detail-anggota";

export const ModalDetailAnggotaMahasiswa = ({ id }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);

  const { data: detail } = useQueryDetailAnggotaProposal(id);
  return (
    <>
      <button className="rounded-lg" onClick={handleOpenModal}>
        <Image src="/icons/detail.svg" width={24} height={24} alt="detail" />
      </button>
      <Modal
        onClose={() => setOpenModal(false)}
        open={openModal}
        containerClassName={"relative"}
      >
        <div className="flex flex-col justify-start gap-4">
          <h2 className="font-semibold text-primary">Detail Mahasiswa</h2>
          <button
            className="absolute right-3 top-2 rounded-full bg-red-06 px-[6px] text-sm text-white"
            onClick={() => setOpenModal(false)}
          >
            x
          </button>
          <div className="mt-2 flex flex-col gap-2">
            <Input
              label="Nama Lengkap"
              labelClass="text-start text-sm font-[500] text-primary w-full lg:w-1/2"
              name="Nama Lengkap"
              placeholder="Nama Lengkap"
              disabled
              defaultValue={detail?.anggota?.nama_lengkap}
            />
            <Input
              label="Perguruan Tinggi"
              labelClass="text-start text-sm font-[500] text-primary w-full lg:w-1/2"
              name="Perguruan Tinggi"
              placeholder="Perguruan Tinggi"
              disabled
              defaultValue={detail?.anggota?.perguruan_tinggi}
            />
            <Input
              label="NIM"
              labelClass="text-start text-sm font-[500] text-primary w-full lg:w-1/2"
              name="NIM"
              placeholder="NIM"
              disabled
              defaultValue={detail?.anggota?.nidn_or_nidk_or_nim}
            />
            <Input
              label="Jabatan Fungsional"
              labelClass="text-start text-sm font-[500] text-primary w-full lg:w-1/2"
              name="Jabatan Funsional"
              placeholder="Jabatan Funsional"
              disabled
              defaultValue={detail?.anggota?.jabatan_fungsional?.nama || "-"}
            />
            <Input
              label="Program Studi"
              labelClass="text-start text-sm font-[500] text-primary w-full lg:w-1/2"
              name="Program Studi"
              placeholder="Program Studi"
              disabled
              defaultValue={detail?.anggota?.program_studi?.nama || "-"}
            />
            <Input
              label="Email"
              labelClass="text-start text-sm font-[500] text-primary w-full lg:w-1/2"
              name="Email"
              placeholder="Email"
              disabled
              defaultValue={detail?.anggota?.email}
            />
            <Input
              label="ID Sinta"
              labelClass="text-start text-sm font-[500] text-primary w-full lg:w-1/2"
              name="ID Sinta"
              placeholder="ID Sinta"
              disabled
              defaultValue={detail?.anggota?.sinta_id}
              containerClass={"hidden lg:flex"}
            />
            <Input
              label="ID Goggle Scholar"
              labelClass="text-start text-sm font-[500] text-primary w-full lg:w-1/2"
              name="ID Goggle Scholar"
              placeholder="ID Goggle Scholar"
              disabled
              defaultValue={detail?.anggota?.google_scholar_id}
              containerClass={"hidden lg:flex"}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
