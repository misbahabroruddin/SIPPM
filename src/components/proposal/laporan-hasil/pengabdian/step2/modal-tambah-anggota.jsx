"use client";

import { useState } from "react";

import { ButtonAdd } from "@/components/button/button-add";
import { Modal } from "@/components/modal";
import { Tab } from "@/components/tab";
import { SelectDosen } from "./select-dosen";
import { FormTambahDosen } from "./form-tambah-dosen";
import { SelectMahasiswa } from "./select-mahasiswa";
import { FormTambahMahasiswa } from "./form-tambah-mahasiswa";

export const ModalTambahAnggota = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setTabActive] = useState("Pilih Dosen");

  const tabs = [
    {
      id: 1,
      tabName: "Pilih Dosen",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("Pilih Dosen"),
      component: <SelectDosen onClose={() => setOpen(false)} />,
    },
    {
      id: 2,
      tabName: "Tambah Dosen",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("Tambah Dosen"),
      component: <FormTambahDosen onClose={() => setOpen(false)} />,
    },
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
      <ButtonAdd
        text="Tambah Anggota"
        onClick={handleOpenModal}
        className="w-full justify-center px-2 py-1 md:w-fit lg:px-4 lg:py-2"
      />
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"lg:w-[800px]"}
      >
        <div className="flex flex-col gap-6">
          <div className="mx-auto flex flex-wrap gap-2 rounded-lg p-1 lg:flex-nowrap lg:bg-sky">
            {tabs.map(({ id, tabName, func }) => {
              return (
                <Tab
                  key={id}
                  tabName={tabName}
                  tabActive={activeTab}
                  onClick={func}
                  className="rounded border border-sky-05 lg:border-none"
                />
              );
            })}
          </div>
          <div className="p-2 lg:px-4">
            {tabs.find(({ tabName }) => tabName === activeTab)?.component}
          </div>
        </div>
      </Modal>
    </>
  );
};
