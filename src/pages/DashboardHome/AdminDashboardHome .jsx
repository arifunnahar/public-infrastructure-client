import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch 
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  // Fetch Latest Issues
  const { data: latestIssues = [] } = useQuery({
    queryKey: ["latest-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues?limit=5");
      return res.data;
    },
  });

  // Fetch Latest Payments 
  const { data: latestPayments = [] } = useQuery({
    queryKey: ["latest-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments?limit=5");
      return res.data;
    },
  });

  // Fetch Latest Users
  const { data: latestUsers = [] } = useQuery({
    queryKey: ["latest-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users?limit=5");
      return res.data;
    },
  });

  if (statsLoading) return <p className="text-center mt-20">Loading dashboard...</p>;

  const {
    totalIssues = 0,
    pendingIssues = 0,
    resolvedIssues = 0,
    rejectedIssues = 0,
    totalUsers = 0,
    paidPayments = [],
  } = stats;

  // Sum of all payments
  const totalPayments = paidPayments.reduce((sum, p) => sum + p.amount, 0);

  const issuesChartData = [
    { name: "Pending", value: pendingIssues },
    { name: "Resolved", value: resolvedIssues },
    { name: "Rejected", value: rejectedIssues },
  ];

  const paymentsChartData = paidPayments.map((p) => ({
    name: p.customer,
    value: p.amount,
  }));

  return (
    <div className="p-6 space-y-10">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        <StatCard title="Total Issues" value={totalIssues} color="blue" />
        <StatCard title="Resolved Issues" value={resolvedIssues} color="green" />
        <StatCard title="Pending Issues" value={pendingIssues} color="yellow" />
        <StatCard title="Rejected Issues" value={rejectedIssues} color="red" />
      
        <StatCard title="Total Payments" value={`$${totalPayments}`} color="indigo" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Issues Status Pie Chart */}
        <div className="bg-green-50 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Issues Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={issuesChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {issuesChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total Payments Bar Chart */}
        <div className="bg-green-50 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Total Payments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentsChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Issues */}
        <div className="bg-green-50 p-4 rounded-xl shadow-md">
          <h3 className="font-bold text-xl mb-4 border-b pb-2 text-gray-700">Latest Issues</h3>
         <ul className="space-y-3">
  {latestIssues.slice(0, 5).map((issue) => (
    <li key={issue._id} className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-3 border rounded-lg hover:shadow-lg transition-shadow">
      <div>
        <span className="font-semibold text-gray-800">{issue.title}</span>
        <p className="text-sm text-gray-500">{issue.category} | {issue.location}</p>
      </div>
      <span
        className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-semibold ${
          issue.status === "pending" ? "bg-yellow-100 text-yellow-800" :
          issue.status === "closed" ? "bg-green-100 text-green-800" :
          issue.status === "rejected" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
        }`}
      >
        {issue.status}
      </span>
    </li>
  ))}
</ul>

        </div>

        {/* Latest Payments */}
        <div className="bg-green-50 p-4 rounded-xl shadow-md">
          <h3 className="font-bold text-xl mb-4 border-b pb-2 text-gray-700">Latest Payments</h3>
          
          <ul className="space-y-3">
  {latestPayments.slice(0, 5).map((pay) => (
    <li
      key={pay._id}
      className="flex justify-between items-center p-3 border rounded-lg hover:shadow-lg transition-shadow"
    >
      <div>
        <span className="font-semibold text-gray-800">{pay.customer}</span>
        <p className="text-sm text-gray-500">{pay.paymentMethod}</p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          pay.paymentStatus === "paid"
            ? "bg-green-100 text-green-800"
            : pay.paymentStatus === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        ${pay.amount} | {pay.paymentStatus}
      </span>
    </li>
  ))}
</ul>


        </div>

        {/* Latest Users */}
        <div className="bg-green-50 p-4 rounded-xl shadow-md">
          <h3 className="font-bold text-xl mb-4 border-b pb-2 text-gray-700">Latest Users</h3>
        <ul className="space-y-3">
  {latestUsers.slice(0, 5).map((user) => (
    <li
      key={user._id}
      className="flex justify-between items-center p-3 border rounded-lg hover:shadow-lg transition-shadow"
    >
      <div>
        <span className="font-semibold text-gray-800">{user.displayName || user.email}</span>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          user.subscription === "premium"
            ? "bg-purple-100 text-purple-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {user.subscription}
      </span>
    </li>
  ))}
</ul>

        </div>
      </div>
    </div>
  );
};

// ---------------- StatCard ----------------
const StatCard = ({ title, value, color }) => {
  const bgColor = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
  }[color];

  return (
    <div className={`${bgColor} p-4 rounded-xl shadow-md text-white`}>
      <p className="text-sm">{title}</p>
      <h4 className="text-2xl font-bold">{value}</h4>
    </div>
  );
};

export default AdminDashboardHome;
