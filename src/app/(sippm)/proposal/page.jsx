import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { DOSEN, LPPM, REVIEWER } from "@/lib/constants/role";

const ProposalPageDosen = dynamic(() =>
  import("./components/views/proposal-page-dosen")
);

const ProposalPageLPPM = dynamic(() =>
  import("./components/views/proposal-page-lppm")
);

const ProposalPageReviewer = dynamic(() =>
  import("./components/views/proposal-page-reviewer")
);

export default async function ProposalPage() {
  const { user } = await getServerSession(authOptions);
  const role = user.roles[0].name;
  return (
    <>
      {role === DOSEN && <ProposalPageDosen />}
      {role === LPPM && <ProposalPageLPPM />}
      {role === REVIEWER && <ProposalPageReviewer />}
    </>
  );
}
