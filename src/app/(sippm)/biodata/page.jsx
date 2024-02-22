import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { DOSEN } from "@/lib/constants/role";
const BiodataPageDosen = dynamic(() =>
  import("./components/views/biodata-page-dosen")
);
const BiodataPageAdministrator = dynamic(() =>
  import("./components/views/biodata-page-administrator")
);

export default async function BiodataPage() {
  const { user } = await getServerSession(authOptions);
  const role = user.roles[0].name;

  return (
    <>{role === DOSEN ? <BiodataPageDosen /> : <BiodataPageAdministrator />}</>
  );
}
