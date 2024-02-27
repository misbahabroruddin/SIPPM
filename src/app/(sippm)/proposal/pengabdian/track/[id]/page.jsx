import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

import { ContainerPage } from "@/components/container-page";
import { authOptions } from "@/config/auth";
import { DOSEN, LPPM } from "@/lib/constants/role";

const TrackPengabdianDosenPage = dynamic(
  () => import("./components/views/track-pengabdian-dosen"),
);

const TrackPengabdianLPPMPage = dynamic(
  () => import("./components/views/track-pengabdian-lppm"),
);

export default async function PageTrackProposal() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.roles[0]?.name;

  return (
    <ContainerPage>
      {role === DOSEN && <TrackPengabdianDosenPage />}
      {role === LPPM && <TrackPengabdianLPPMPage />}
    </ContainerPage>
  );
}
