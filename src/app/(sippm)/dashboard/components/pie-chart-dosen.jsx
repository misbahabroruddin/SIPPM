"use client";

import { PieChart } from "@/components/charts/pie-chart";

export const PieChartDosen = ({
  textHeader,
  totalProposal = 0,
  proposalDitolak = 0,
  proposalDisetujui = 0,
  proposalRevisi = 0,
}) => {
  const data = {
    labels: ["Ditolak", "Disetujui", "Revisi"],
    datasets: [
      {
        data: [proposalDitolak, proposalDisetujui, proposalRevisi],
        backgroundColor: [
          "rgba(255, 102, 102, 0.7)",
          "rgba(128, 241, 102, 0.7)",
          "rgba(180, 220, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 102, 102, 1)",
          "rgba(128, 241, 102, 1)",
          "rgba(180, 220, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray1 px-6 py-4 shadow">
      <h2 className="text-lg font-[500]">{textHeader}</h2>
      <p className="text-2xl font-[500] text-blue-primary">{totalProposal}</p>
      <PieChart data={data} />
    </div>
  );
};