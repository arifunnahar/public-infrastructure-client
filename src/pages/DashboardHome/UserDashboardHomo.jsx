import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";


const UserDashboardHomo = () => {
  const [stats, setStats] = useState({
    totalIssues: 0,
    pendingIssues: 0,
    inProgressIssues: 0,
    resolvedIssues: 0,
    totalPayments: 0,
  });

 
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
// ----------------------------------
  useEffect(() => {
    axiosSecure
      .get(`/user-stats/${user.email}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard API error:", err));
  }, [axiosSecure]);

  const cardData = [
    { title: "Total Issues", value: stats.totalIssues, bg: "bg-blue-500" },
    { title: "Pending Issues", value: stats.pendingIssues, bg: "bg-yellow-500" },
    { title: "In Progress", value: stats.inProgressIssues, bg: "bg-purple-500" },
    { title: "Resolved Issues", value: stats.resolvedIssues, bg: "bg-green-500" },
    { title: "Total Payments (USD)", value: stats.totalPayments, bg: "bg-teal-500" },
  ];

  const chartData = [
    { name: "Pending", value: stats.pendingIssues },
    { name: "In Progress", value: stats.inProgressIssues },
    { name: "Resolved", value: stats.resolvedIssues },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Citizen Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cardData.map((card, idx) => (
          <div key={idx} className={`p-6 rounded-lg shadow text-white ${card.bg}`}>
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Issue Status Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashboardHomo;

