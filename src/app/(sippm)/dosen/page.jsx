import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { authOptions } from "@/config/auth";
import { LPPM } from "@/lib/constants/role";

const DosenPageLPPM = dynamic(
  () => import("./components/views/dosen-page-lppm"),
  { ssr: false },
);

export default async function DosenPage() {
  const { user } = await getServerSession(authOptions);
  const role = user.roles[0].name;
  return <>{role === LPPM && <DosenPageLPPM />}</>;
}
