import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { DOSEN, LPPM } from "@/lib/constants/role";
import { redirect } from "next/navigation";

const LaporanHasilPageDosen = dynamic(
  () => import("./components/views/laporan-hasil-page-dosen"),
);
const LaporanHasilPageLppm = dynamic(
  () => import("./components/views/laporan-hasil-page-lppm"),
);

export default async function LaporanHasilPage() {
  const { user } = await getServerSession(authOptions);
  const role = user.roles[0].name;

  return (
    <>
      {role === DOSEN && <LaporanHasilPageDosen />}
      {role === LPPM && <LaporanHasilPageLppm />}
    </>
  );
}
