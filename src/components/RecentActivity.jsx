// src/components/RecentActivity.jsx
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

const RecentActivity = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=8"
  );

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-sm p-4">Error: {error}</p>;
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm p-4">No activity found.</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-gray-700 font-semibold text-base mb-4">Recent Activity</h3>
      <ul className="flex flex-col gap-3">
        {data.map((post) => (
          <li
            key={post.id}
            className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-none last:pb-0"
          >
        
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
              {post.userId}
            </div>

           
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-gray-700 capitalize leading-snug">
                {post.title.length > 50
                  ? post.title.substring(0, 50) + "..."
                  : post.title}
              </p>
              <p className="text-xs text-gray-400">User #{post.userId} · Post #{post.id}</p>
            </div>

           
            <span className="ml-auto text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full shrink-0">
              Active
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;