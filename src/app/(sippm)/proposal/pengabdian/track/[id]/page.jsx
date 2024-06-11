import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

import { ContainerPage } from "@/components/container-page";
import { authOptions } from "@/config/auth";

const TrackPengabdianDosenPage = dynamic(
  () => import("./components/views/track-pengabdian-dosen"),
  { ssr: false },
);

export default async function PageTrackProposal() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.roles[0]?.name;

  return (
    <ContainerPage>
      <TrackPengabdianDosenPage />
    </ContainerPage>
  );
}
