import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { HoldingsPerMonth } from "../../pages/sec";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

interface props {
  holdings: HoldingsPerMonth[];
}

const LineChart: React.FunctionComponent<props> = ({ holdings }) => {
  const dataN: number[] = [];
  const labels: string[] = [];

  holdings.forEach((holding) => {
    dataN.push(holding.holding.amount);
    labels.push(
      holding.month.toLocaleString("en-us", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  });
  const data = {
    labels,
    datasets: [
      {
        label: "Port1Holdings",
        data: dataN,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
