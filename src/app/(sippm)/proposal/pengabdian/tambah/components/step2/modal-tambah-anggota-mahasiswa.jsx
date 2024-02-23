"use client";
import { useState } from "react";

import { ButtonAdd } from "@/components/button/button-add";
import { Modal } from "@/components/modal";
import { Tab } from "@/components/tab";
import { SelectMahasiswa } from "./select-mahasiswa";
import { FormTambahMahasiswa } from "./form-tambah-mahasiswa";

export const ModalTambahAnggotaMahasiswa = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setTabActive] = useState("Pilih Mahasiswa");

  const tabs = [
    {
      id: 3,
      tabName: "Pilih Mahasiswa",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("Pilih Mahasiswa"),
      component: <SelectMahasiswa onClose={() => setOpen(false)} />,
    },
    {
      id: 4,
      tabName: "Tambah Mahasiswa",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("Tambah Mahasiswa"),
      component: <FormTambahMahasiswa onClose={() => setOpen(false)} />,
    },
  ];

  const handleTabClick = (tab) => {
    setTabActive(tab);
  };

  const handleOpenModal = () => setOpen(true);
  return (
    <>
      <ButtonAdd text='Tambah Mahasiswa' onClick={handleOpenModal} />
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"lg:w-[600px]"}
      >
        <div className='flex flex-col gap-6'>
          <div className='flex gap-2 mx-auto bg-sky p-1 rounded-lg'>
            {tabs.map(({ id, tabName, func }) => {
              return (
                <Tab
                  key={id}
                  tabName={tabName}
                  tabActive={activeTab}
                  onClick={func}
                />
              );
            })}
          </div>
          <div className='px-4'>
            {tabs.find((tab) => tab.tabName === activeTab).component}
          </div>
        </div>
      </Modal>
    </>
  );
};
