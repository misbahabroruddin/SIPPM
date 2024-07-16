export const MENU_SIDEBAR_ADMIN = [
  {
    label: "Dashboard",
    icon: "/icons/dashboard.svg",
    link: "/dashboard",
  },
  {
    label: "Proposal",
    icon: "/icons/proposal.svg",
    link: "/proposal",
  },
  {
    label: "Anggota",
    icon: "/icons/anggota.svg",
    link: "/anggota",
    children: [
      {
        label: "Dosen",
        icon: "/icons/sub-menu.svg",
        link: "/anggota/dosen",
      },
      {
        label: "Mahasiswa",
        icon: "/icons/sub-menu.svg",
        link: "/anggota/mahasiswa",
      },
    ],
  },
  {
    label: "Data Referensi",
    icon: "/icons/data-referensi.svg",
    link: "/data-referensi",
    children: [
      {
        label: "Bidang Ilmu",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/bidang-ilmu",
      },
      {
        label: "Jabatan Fungsional",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/jabatan-fungsional",
      },
      {
        label: "Program Studi",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/program-studi",
      },
      {
        label: "Jenis Penelitian",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/jenis-penelitian",
      },
      {
        label: "Rumpun Ilmu",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/rumpun-ilmu",
      },
      {
        label: "Luaran Wajib",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/luaran-wajib",
      },
      {
        label: "Kabupaten",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/kabupaten",
      },
      {
        label: "Rincian Biaya",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/rincian-biaya",
      },
      {
        label: "Jenis Dokumen",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/jenis-dokumen",
      },
      {
        label: "Kriteria Penilaian",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/kriteria-penilaian",
      },
      {
        label: "Komponen Penilaian",
        icon: "/icons/sub-menu.svg",
        link: "/data-referensi/komponen-penilaian",
      },
    ],
  },
];

export const MENU_SIDEBAR_DOSEN = [
  {
    label: "Dashboard",
    icon: "/icons/dashboard.svg",
    link: "/dashboard",
  },
  {
    label: "Proposal",
    icon: "/icons/proposal.svg",
    link: "/proposal",
  },
  // {
  //   label: "Penilaian",
  //   icon: "/icons/penilaian.svg",
  //   link: "/penilaian",
  // },
  // {
  //   label: "Monev",
  //   icon: "/icons/monev.svg",
  //   link: "/monev",
  // },
  {
    label: "Document",
    icon: "/icons/document.svg",
    link: "/document",
    children: [
      {
        label: "Penelitian",
        icon: "/icons/sub-menu.svg",
        link: "/document/penelitian",
      },
      {
        label: "PKM",
        icon: "/icons/sub-menu.svg",
        link: "/document/pengabdian",
      },
    ],
  },
  // {
  //   label: "Insentif",
  //   icon: "/icons/insentif.svg",
  //   link: "/insentif",
  // },
  // {
  //   label: "Repository",
  //   icon: "/icons/repository.svg",
  //   link: "/repository",
  // },
  {
    label: "Laporan Hasil",
    icon: "/icons/laporan-hasil.svg",
    link: "/laporan-hasil",
  },
];

export const MENU_SIDEBAR_LPPM = [
  {
    label: "Dashboard",
    icon: "/icons/dashboard.svg",
    link: "/dashboard",
  },
  // {
  //   label: "Dosen",
  //   icon: "/icons/dosen.svg",
  //   link: "/dosen",
  // },
  {
    label: "Proposal",
    icon: "/icons/proposal.svg",
    link: "/proposal",
  },
  {
    label: "Document",
    icon: "/icons/document.svg",
    link: "/document",
    children: [
      {
        label: "Penelitian",
        icon: "/icons/sub-menu.svg",
        link: "/document/penelitian",
      },
      {
        label: "PKM",
        icon: "/icons/sub-menu.svg",
        link: "/document/pengabdian",
      },
    ],
  },
  // {
  //   label: "Laporan",
  //   icon: "/icons/document.svg",
  //   link: "/laporan",
  // },
];

export const MENU_SIDEBAR_REVIEWER = [
  {
    label: "Dashboard",
    icon: "/icons/dashboard.svg",
    link: "/dashboard",
  },
  // {
  //   label: "Dosen",
  //   icon: "/icons/dosen.svg",
  //   link: "/dosen",
  // },
  {
    label: "Proposal",
    icon: "/icons/proposal.svg",
    link: "/proposal",
  },
  // {
  //   label: "Document",
  //   icon: "/icons/document.svg",
  //   link: "/document",
  // },
  // {
  //   label: "Laporan",
  //   icon: "/icons/document.svg",
  //   link: "/laporan",
  // },
];
