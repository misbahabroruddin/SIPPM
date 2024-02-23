"use client";

import Image from "next/image";
import { useState } from "react";

import { Modal } from "@/components/modal";
import { Input } from "@/components/input/input";
import { useQueryDetailAnggotaDosenPKM } from "@/handlers/pengabdian/anggota/query-detaill-anggota-dosen-pkm";

export const ModalDetailAnggotaDosen = ({ id }) => {
  const [openModal, setOpenModal] = useState(false);
  const { detail } = useQueryDetailAnggotaDosenPKM(id);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <>
      <button className='rounded-lg' onClick={handleOpenModal}>
        <Image src='/icons/detail.svg' width={24} height={24} alt='detail' />
      </button>
      <Modal
        onClose={() => setOpenModal(false)}
        open={openModal}
        containerClassName={"relative"}
      >
        <div className='flex flex-col justify-start gap-4'>
          <h2 className='text-primary font-semibold'>Detail Dosen</h2>
          <button
            className='absolute top-2 right-3 bg-red-06 text-white rounded-full px-[6px] text-sm'
            onClick={() => setOpenModal(false)}
          >
            x
          </button>
          <div className='flex flex-col gap-2 mt-2'>
            <Input
              label='Nama Lengkap'
              labelClass='text-start'
              name='Nama Lengkap'
              placeholder='Nama Lengkap'
              disabled
              defaultValue={detail?.anggota?.nama_lengkap}
            />
            <Input
              label='Perguruan Tinggi'
              labelClass='text-start'
              name='Perguruan Tinggi'
              placeholder='Perguruan Tinggi'
              disabled
              defaultValue={detail?.anggota?.perguruan_tinggi}
            />
            <Input
              label='NIDN/NIDK'
              labelClass='text-start'
              name='NIDN/NIDK'
              placeholder='NIDN/NIDK'
              disabled
              defaultValue={detail?.anggota?.nidn_or_nidk_nim}
            />
            <Input
              label='Jabatan Fungsional'
              labelClass='text-start'
              name='Jabatan Funsional'
              placeholder='Jabatan Funsional'
              disabled
              defaultValue={detail?.anggota?.jabatan_fungsional?.nama || "-"}
            />
            <Input
              label='Program Studi'
              labelClass='text-start'
              name='Program Studi'
              placeholder='Program Studi'
              disabled
              defaultValue={detail?.anggota?.program_studi?.nama || "-"}
            />
            <Input
              label='Email'
              labelClass='text-start'
              name='Email'
              placeholder='Email'
              disabled
              defaultValue={detail?.anggota?.email}
            />
            <Input
              label='ID Sinta'
              labelClass='text-start'
              name='ID Sinta'
              placeholder='ID Sinta'
              disabled
              defaultValue={detail?.anggota?.sinta_id}
            />
            <Input
              label='ID Goggle Scholar'
              labelClass='text-start'
              name='ID Goggle Scholar'
              placeholder='ID Goggle Scholar'
              disabled
              defaultValue={detail?.anggota?.google_scholar_id}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
