import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";


const COLORS = ["#22c55e", "#facc15"];

const StaffDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch staff
  const { data = {}, isLoading } = useQuery({
    queryKey: ["staff-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/staff/stats?email=${user.email}`
        
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-20">Loading dashboard...</p>;
  }

  const {
    assignedIssues = 0,
    resolvedIssues = 0,
    todayTasks = [],
  } = data;

  const chartData = [
    { name: "Resolved", value: resolvedIssues },
    {
      name: "Pending",
      value: Math.max(assignedIssues - resolvedIssues, 0),
    },
  ];

  return (
    <div className="p-6 space-y-10">

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Assigned Issues"
          value={assignedIssues}
          color="blue"
        />
        <StatCard
          title="Resolved Issues"
          value={resolvedIssues}
          color="green"
        />
        <StatCard
          title="Today’s Tasks"
          value={todayTasks.length}
          color="yellow"
        />
      </div>

      {/* Todays task*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* -------- Issue Status Overview -------- */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Issue Status Overview
              </h2>
              <p className="text-sm text-gray-500">
                Resolved vs Pending
              </p>
            </div>
           
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-6 mt-4">
            <LegendItem color="bg-green-500" label="Resolved" />
            <LegendItem color="bg-yellow-400" label="Pending" />
          </div>
        </div>

        {/* -------- Todays Assigned Tasks -------- */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Today’s Assigned Tasks
            </h2>
            <span className="text-sm text-gray-500">
              Total: {todayTasks.length}
            </span>
          </div>

          {todayTasks.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
               No tasks assigned today
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-gray-500">
                    <th className="text-left px-4">Title</th>
                    <th className="text-left px-4">Category</th>
                    <th className="text-left px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayTasks.map((task) => (
                    <tr
                      key={task._id}
                      className="bg-gray-50 hover:bg-green-50 transition rounded-lg"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {task.title}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {task.category}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            task.status === "closed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------Reusable Component -------------*/

const StatCard = ({ title, value, color }) => {
  const bg = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
  }[color];

  return (
    <div className={`${bg} p-5 rounded-xl shadow-md text-white`}>
      <p className="text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  );
};

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`}></span>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

export default StaffDashboardHome;
