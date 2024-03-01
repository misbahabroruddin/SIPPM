"use client";

import { CardDashboard } from "@/components/card/card-dashboard";

export default function ListCardPenelitianDashboardDosen({
  jumlahPenelitian,
  jumlahPenelitianDisetujui,
  jumlahPenelitianDitolak,
}) {
  return (
    <div className="mt-4 flex gap-4">
      <CardDashboard
        status="Jumlah"
        title="Proposal Penelitian"
        jumlah={jumlahPenelitian}
      />
      <CardDashboard title="Penelitian" jumlah={jumlahPenelitianDisetujui} />
      <CardDashboard
        status="Ditolak"
        title="Penelitian"
        jumlah={jumlahPenelitianDitolak}
      />
    </div>
  );
}
