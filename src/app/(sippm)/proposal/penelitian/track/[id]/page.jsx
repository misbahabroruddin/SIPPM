import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { ContainerPage } from "@/components/container-page";
import { authOptions } from "@/config/auth";
import { DOSEN, LPPM, REVIEWER } from "@/lib/constants/role";

const TrackPenelitianDosenPage = dynamic(
  () => import("./components/views/track-penelitian-dosen"),
);

const TrackPenelitianLPPMPage = dynamic(
  () => import("./components/views/track-penelitian-lppm"),
);

export default async function TrackPenelitianPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.roles[0]?.name;

  return (
    <ContainerPage>
      {role === DOSEN && <TrackPenelitianDosenPage />}
      {role === LPPM && <TrackPenelitianLPPMPage />}
      {role === REVIEWER && <>Reviewer</>}
    </ContainerPage>
  );
}
