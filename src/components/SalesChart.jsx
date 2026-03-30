// src/components/SalesChart.jsx
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
  Filler,
} from "chart.js";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesChart = () => {
  const { data, loading, error } = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1"
  );

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-sm p-4">Error: {error}</p>;
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm p-4">No data available.</p>;

  const chartData = {
    labels: data.map((coin) => coin.symbol.toUpperCase()),
    datasets: [
      {
        label: "Current Price (USD)",
        data: data.map((coin) => coin.current_price),
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        pointRadius: 5,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-gray-700 font-semibold text-base mb-4">
        Sales Figures{" "}
        <span className="text-xs text-gray-400 font-normal">
          (Live Crypto Prices)
        </span>
      </h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;