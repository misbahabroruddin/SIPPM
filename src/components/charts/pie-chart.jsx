"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// ChartJS.overrides["pie"].plugins.legend.position;
// ChartJS.overrides["pie"].interaction.mode;

// const data = {
//   labels: ["Ditolak", "Disetujui", "Revisi"],
//   datasets: [
//     {
//       data: dataChart,
//       backgroundColor: [
//         "rgba(255, 102, 102, 0.7)",
//         "rgba(128, 241, 102, 0.7)",
//         "rgba(180, 220, 255, 0.7)",
//       ],
//       borderColor: [
//         "rgba(255, 102, 102, 1)",
//         "rgba(128, 241, 102, 1)",
//         "rgba(180, 220, 255, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

const options = {
  plugins: {
    datalabels: {
      color: "rgba(102, 102, 102, 1)",
      font: {
        size: 16,
        weight: "bold",
      },
      display: function (context) {
        return context.dataset.data[context.dataIndex] > 0; // or >= 1 or ...
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      position: "right",
      maxHeight: 500,
      maxWidth: 500,
      display: true,
      labels: {
        color: "#000000",
        usePointStyle: true,
      },
    },
  },
};

export const PieChart = ({ data = {} }) => {
  return data ? <Pie data={data} options={options} /> : <></>;
};
