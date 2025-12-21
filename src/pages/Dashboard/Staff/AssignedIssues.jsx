import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

// Status flow 
const statusOptions = {
  pending: ["in-progress"],
  "in-progress": ["working"],
  working: ["resolved"],
  resolved: ["closed"],
  closed: [],
};

// Color  priority
const statusColors = {
  pending: "bg-gray-200 text-gray-800",
  "in-progress": "bg-yellow-200 text-yellow-800",
  working: "bg-blue-400 text-white",
  resolved: "bg-green-200 text-green-800",
  closed: "bg-gray-700 text-white",
};

const priorityColors = {
  high: "bg-red-200 text-red-800",
  normal: "bg-gray-100 text-gray-800",
};

const AssignedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ status: "", priority: "" });

  // ------------------- Fetch assigned issues -------------------
  const { data: issues = [], isLoading, refetch } = useQuery({
    queryKey: ["assignedIssues", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/assigned-issues", { params: filters });

  
      return res.data.sort((a, b) => {
      
        if (a.priority === "high" && b.priority !== "high") return -1;
        if (a.priority !== "high" && b.priority === "high") return 1;

        //  Boosted issues next
        if (b.boosted && !a.boosted) return 1;
        if (a.boosted && !b.boosted) return -1;

        // Most recent )
        if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);

        return 0;
      });
    },
    keepPreviousData: true,
  });

  // ------------------- Mutation update  -------------------
  const updateStatusMutation = useMutation({
    mutationFn: async ({ issueId, newStatus }) => {
      return await axiosSecure.patch(`/issue/${issueId}/status`, { status: newStatus });
    },
    onSuccess: (_, { issueId, newStatus }) => {
      queryClient.setQueryData(["assignedIssues", filters], (oldData) =>
        oldData.map((issue) =>
          issue._id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
      toast.success("Status updated successfully!");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const handleStatusChange = (issue, newStatus) => {
    if (!newStatus) return;
    updateStatusMutation.mutate({ issueId: issue._id, newStatus });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="text-gray-500">Loading...</span>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Assigned Issues</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Filters:</span>
        </div>

        <select
          value={filters.status}
          onChange={(e) => {
            setFilters({ ...filters, status: e.target.value });
            refetch();
          }}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Status</option>
          {Object.keys(statusOptions).map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => {
            const value = e.target.value;
            setFilters((prev) => ({ ...prev, priority: value }));
            refetch({ ...filters, priority: value });
          }}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Assigned Staff</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>

          <tbody className="bg-gray-100">
            {issues.map((issue,index) => (
              <tr key={issue._id} className={issue.boosted ? "bg-yellow-50" : ""}>
                <td className="px-4 py-3">{index+1}</td>
                <td className="px-4 py-3">{issue.title}</td>
                <td className="px-4 py-3">{issue.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[issue.priority]}`}
                  >
                    {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[issue.status]}`}
                  >
                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                  </span>
                </td>

          

           <td className="px-4 py-3">
              {issue.status === "resolved" ? (
                issue.assignedStaff?.name || "N/A"
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </td>


                <td className="px-4 py-3">
                  {statusOptions[issue.status]?.length > 0 ? (
                    <select
                      value=""
                      onChange={(e) => handleStatusChange(issue, e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="" disabled>
                        Change Status
                      </option>
                      {statusOptions[issue.status].map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedIssues;
