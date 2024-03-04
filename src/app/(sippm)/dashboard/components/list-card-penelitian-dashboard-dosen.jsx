"use client";

import { CardDashboard } from "@/components/card/card-dashboard";

export default function ListCardPenelitianDashboardDosen({
  jumlahPenelitian,
  jumlahPenelitianDisetujui,
  jumlahPenelitianDitolak,
}) {
  return (
    <div className="flex gap-4">
      <CardDashboard status="Jumlah" jumlah={jumlahPenelitian} />
      <CardDashboard jumlah={jumlahPenelitianDisetujui} />
      <CardDashboard status="Ditolak" jumlah={jumlahPenelitianDitolak} />
    </div>
  );
}
