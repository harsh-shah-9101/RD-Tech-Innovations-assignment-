// src/components/UserGrowthChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserGrowthChart = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-sm p-4">Error: {error}</p>;
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm p-4">No data available.</p>;

  const chartData = {
    labels: data.map((user) => user.name.split(" ")[0]),
    datasets: [
      {
        label: "Users",
        data: data.map((_, index) => index + 1),
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderRadius: 6,
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
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-gray-700 font-semibold text-base mb-4">User Growth</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default UserGrowthChart;