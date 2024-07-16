import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { DOSEN, LPPM, REVIEWER, ADMINISTRATOR } from "@/lib/constants/role";

const ProposalPageDosen = dynamic(
  () =>
    import("./components/views/proposal-page-dosen", {
      ssr: false,
    }),
);

const ProposalPageLPPM = dynamic(
  () => import("./components/views/proposal-page-lppm", { ssr: false }),
);

const ProposalPageReviewer = dynamic(
  () => import("./components/views/proposal-page-reviewer", { ssr: false }),
);

const ProposalPageAdministrator = dynamic(
  () =>
    import("./components/views/proposal-page-administrator", { ssr: false }),
);

export default async function ProposalPage() {
  const { user } = await getServerSession(authOptions);
  const role = user.roles[0].name;
  return (
    <>
      {role === DOSEN && <ProposalPageDosen />}
      {role === LPPM && <ProposalPageLPPM />}
      {role === REVIEWER && <ProposalPageReviewer />}
      {role === ADMINISTRATOR && <ProposalPageAdministrator />}
    </>
  );
}
