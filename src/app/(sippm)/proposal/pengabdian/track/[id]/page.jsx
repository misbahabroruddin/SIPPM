import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

import { ContainerPage } from "@/components/container-page";
import { authOptions } from "@/config/auth";
import { DOSEN, LPPM, REVIEWER } from "@/lib/constants/role";
import TrackPengabdianReviewerPage from "./components/views/track-pengabdian-reviewer";

const TrackPengabdianDosenPage = dynamic(
  () => import("./components/views/track-pengabdian-dosen"),
  { ssr: false },
);

const TrackPengabdianLPPMPage = dynamic(
  () => import("./components/views/track-pengabdian-lppm"),
  { ssr: false },
);

export default async function PageTrackProposal() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.roles[0]?.name;

  return (
    <ContainerPage>
      {role === DOSEN && <TrackPengabdianDosenPage />}
      {role === LPPM && <TrackPengabdianLPPMPage />}
      {role === REVIEWER && <TrackPengabdianReviewerPage />}
    </ContainerPage>
  );
}
