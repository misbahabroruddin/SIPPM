import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { ContainerPage } from "@/components/container-page";
import { authOptions } from "@/config/auth";

const TrackPenelitianDosenPage = dynamic(
  () => import("./components/views/track-penelitian-dosen"),
  { ssr: false },
);

export default async function TrackPenelitianPage() {
  const session = await getServerSession(authOptions);

  return (
    <ContainerPage>
      <TrackPenelitianDosenPage />
    </ContainerPage>
  );
}
