"use client";

import { CardDashboard } from "@/components/card/card-dashboard";

export default function ListCardPengabdianDashboardDosen({
  jumlahPengabdian,
  jumlahPengabdianDisetujui,
  jumlahPengabdianDitolak,
}) {
  return (
    <div className="flex flex-wrap gap-2 lg:gap-4">
      <CardDashboard status="Jumlah" jumlah={jumlahPengabdian} />
      <CardDashboard jumlah={jumlahPengabdianDisetujui} />
      <CardDashboard status="Ditolak" jumlah={jumlahPengabdianDitolak} />
    </div>
  );
}
