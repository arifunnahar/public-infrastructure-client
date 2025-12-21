import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const MyIssuesPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });




   // --- Fetch user block status ---
  const { data: blockInfo = { isBlocked: false }, isLoading: blockLoading } = useQuery({
    queryKey: ["userBlockStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/status/${user?.email}`);
      return data;
    },
  });

  const isBlocked = blockInfo?.isBlocked || false;






  // Load My Issues
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["myIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?email=${user.email}`);
      return res.data;
    },
  });




  // delete Issue
  const handleIssueDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/issues/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              Swal.fire("Deleted!", res.data.message, "success");
              queryClient.invalidateQueries(["myIssues", user?.email]);
            } else {
              Swal.fire(
                "Error!",
                res.data.message || "Issue not found or already deleted.",
                "error"
              );
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete issue.", "error");
          });
      }
    });
  };

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      await axiosSecure.patch(`/issues/${id}`, updatedData);
    },
    onSuccess: () => {
      toast.success("Issue updated successfully!");
      queryClient.invalidateQueries(["myIssues", user?.email]);
      setEditId(null);
    },
    onError: () => {
      toast.error("Failed to update issue");
    },
  });

  if (isLoading)
    return <p className="text-center py-10 text-xl">Loading...</p>;

  const openEditModal = (issue) => {
    setEditId(issue._id);
    setEditData({
      title: issue.title,
      category: issue.category,
      location: issue.location,
      description: issue.description,
    });
  };

  return (
    <div className="p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-xl font-bold mb-6">My Issues ({issues.length})</h1>

      {/* Edit Modal */}
      {editId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-gray-100 p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Edit Issue</h2>
            <div className="space-y-3">
              <label className="font-semibold">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />

              <label className="font-semibold">Category</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />

              <label className="font-semibold">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
              />

              <label className="font-semibold">Description</label>
              <textarea
                rows="4"
                className="w-full p-2 border rounded"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-1 bg-gray-300 rounded"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded"
                onClick={() =>
                  updateMutation.mutate({ id: editId, updatedData: editData })
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Table */}
      {issues.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't reported any issues yet.
        </p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full -collapse text-sm">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-2">No</th>
                <th className="p-2">Image</th>
                <th className="p-2">Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Location</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">Assigned Staff</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {[...issues]
                .sort((a, b) => {
                  const priorityA = a.priority?.toLowerCase();
                  const priorityB = b.priority?.toLowerCase();
                  if (priorityA === "high" && priorityB !== "high") return -1;
                  if (priorityB === "high" && priorityA !== "high") return 1;
                  return new Date(b.createdAt) - new Date(a.createdAt);
                })
                  
 

                  
                  
                .map((issue, index) => (
                  <tr key={issue._id}>
                    <th className="p-2">{index + 1}</th>
                    <td className="p-2">
                      <img
                        src={issue.imageUrl}
                        alt="Issue"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 font-semibold">{issue.title}</td>
                    <td className="p-2">{issue.category}</td>
                    <td className="p-2">{issue.location}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          issue.priority?.toLowerCase() === "high"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {issue.priority}
                      </span>
                    </td>
                    <td className="p-2">{issue.status}</td>
                    <td className="p-2">{issue.assignedStaff?.name || "Not Assigned"}</td>
                    <td className="p-2">
                      <div className="flex justify-center items-center gap-2">
                        <a
                          href={`/issues/${issue._id}`}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                        >
                          View
                        </a>


                       

                       


                  {issue.status === "pending" && (
                  <button
                    onClick={() => openEditModal(issue)}
                    disabled={isBlocked} 
                    className={`px-3 py-1 text-white rounded text-xs ${
                      isBlocked
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    Edit
                  </button>
                )}


                        <button
                          onClick={() => handleIssueDelete(issue._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyIssuesPage;
