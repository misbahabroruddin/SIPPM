import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

import { BasePageTitle } from "@/components/base-page-title";
import { DOSEN, LPPM, REVIEWER } from "@/lib/constants/role";
import { ContainerPage } from "@/components/container-page";
import { authOptions } from "@/config/auth";

const DashboardLppm = dynamic(
  () => import("./components/views/dashboard-lppm"),
  { ssr: false },
);

const DashboardDosen = dynamic(
  () => import("./components/views/dashboard-dosen"),
  { ssr: false },
);
const DashboardReviewer = dynamic(
  () => import("./components/views/dashboard-reviewer"),
  { ssr: false },
);

export default async function HomePage() {
  const { user } = await getServerSession(authOptions);
  const role = user.roles[0].name;

  return (
    <ContainerPage>
      <BasePageTitle />
      {role === LPPM && <DashboardLppm />}
      {role === DOSEN && <DashboardDosen />}
      {role === REVIEWER && <DashboardReviewer />}
    </ContainerPage>
  );
}
