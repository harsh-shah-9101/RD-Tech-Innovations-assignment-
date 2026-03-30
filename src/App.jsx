// src/App.jsx
import useFetch from "./hooks/useFetch";
import MetricCard from "../src/components/MatricCard";
import UserGrowthChart from "../src/components/UserGrowthChart";
import SalesChart from "../src/components/SalesChart";
import RecentActivity from "../src/components/RecentActivity";
import coinsSnapshot from "./data/coins";

const App = () => {
  const { data: users } = useFetch("https://jsonplaceholder.typicode.com/users");
  const { data: posts } = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
  const coins = coinsSnapshot;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Live data from JSONPlaceholder + market snapshot</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MetricCard
          title="Total Users"
          value={users ? users.length : "—"}
          subtitle="Registered accounts"
          icon="👥"
        />
        <MetricCard
          title="Top Coin Price"
          value={coins.length > 0 ? `$${parseFloat(coins[0].priceUsd).toLocaleString()}` : "—"}
          subtitle={coins.length > 0 ? coins[0].name : "Unavailable"}
          icon="💰"
        />
        <MetricCard
          title="Recent Activities"
          value={posts ? posts.length : "—"}
          subtitle="Last 8 actions"
          icon="⚡"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <UserGrowthChart />
        <SalesChart />
      </div>

      {/* Activity Feed */}
      <RecentActivity />

    </div>
  );
};

export default App;