import { Line } from "react-chartjs-2";
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
import coinsSnapshot from "../data/coins";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const coins = coinsSnapshot;
  if (coins.length === 0) {
    return <p className="text-gray-400 text-sm p-4">No data available.</p>;
  }

  const chartData = {
    labels: coins.map((coin) => coin.symbol.toUpperCase()),
    datasets: [
      {
        label: "Current Price (USD)",
        data: coins.map((coin) => Number.parseFloat(coin.priceUsd)),
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        pointRadius: 4,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-gray-700 font-semibold text-base mb-4">Sales Overview</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
