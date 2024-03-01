"use client";

import { CardDashboard } from "@/components/card/card-dashboard";

export default function ListCardPengabdianDashboardDosen({
  jumlahPengabdian,
  jumlahPengabdianDisetujui,
  jumlahPengabdianDitolak,
}) {
  return (
    <div className="mt-4 flex gap-4">
      <CardDashboard status="Jumlah" title="Proposal PKM" jumlah={1} />
      <CardDashboard title="Pengabdian" jumlah={2} />
      <CardDashboard status="Ditolak" title="Pengabdian" jumlah={2} />
    </div>
  );
}
