// src/App.jsx
import useFetch from "./hooks/useFetch";
import MetricCard from "./components/MetricCard";
import UserGrowthChart from "./components/UserGrowthChart";
import SalesChart from "./components/SalesChart";
import RecentActivity from "./components/RecentActivity";

const App = () => {
  const { data: users } = useFetch("https://jsonplaceholder.typicode.com/users");
  const { data: posts } = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
  const { data: coins } = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Live data from JSONPlaceholder & CoinGecko</p>
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
          value={coins ? `$${coins[0].current_price.toLocaleString()}` : "—"}
          subtitle={coins ? coins[0].name : "Loading..."}
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