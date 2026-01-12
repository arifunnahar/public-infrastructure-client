import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// --- color  ---
const statusColors = {
  pending: "bg-orange-300 text-gray-800",
  rejected: "bg-red-400 text-red-800",
  "in-progress": "bg-yellow-200 text-yellow-800",
  working: "bg-blue-400 text-white",
  resolved: "bg-green-400 text-green-800",
  closed: "bg-gray-700 text-white",
};

// --- Assign Staff Modal Component---------- ---
const AssignStaffModal = ({ issue, close, axiosSecure, allIssues, onAssignSuccess }) => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    axiosSecure.get("/staff").then((res) => {
      const staffWithStatus = res.data.map((staff) => {
        const busy = allIssues.some(
          (i) =>
            i.assignedStaff?.staffId === staff._id &&
            (i.status === "pending" || i.status === "in-progress")
        );
        return { ...staff, isBusy: busy };
      });
      setStaffList(staffWithStatus);
    });
  }, [axiosSecure, allIssues]);

  const handleAssign = (staff) => {
    const payload = {
      staffId: staff._id,
      name: staff.name,
      email: staff.email,
    };

    axiosSecure
      .patch(`/assign-staff/${issue._id}`, payload)
      .then(() => {
        toast.success(`${staff.name} Already assigned!`);
        onAssignSuccess();
        close();
      })
      .catch(() => toast.error("Assign failed"));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-800 dark:text-gray-100">
          Assign Staff to: <span className="text-blue-600 font-bold">{issue.title}</span>
        </h3>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {staffList.map((staff) => (
            <div key={staff._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md border">
              <span className="font-medium text-gray-700  dark:text-gray-200">{staff.name}</span>
              <button
                disabled={staff.isBusy}
                onClick={() => handleAssign(staff)}
                className={`px-4 py-1.5 rounded text-xs font-semibold text-white transition-all ${
                  staff.isBusy ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 shadow-md"
                }`}
              >
                {staff.isBusy ? "Busy" : "Assign"}
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={close}
          className="mt-6 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300  transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// --- Main View Component ------------------------------------------------
const ViewAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedIssue, setSelectedIssue] = useState(null);

  const { data: issues = [] } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/reject-issue/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allIssues"]);
      toast.success("Issue Rejected!");
    },
  });

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this issue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) rejectMutation.mutate(id);
    });
  };

  const sortedIssues = [...issues].sort((a, b) => (a.boost === b.boost ? 0 : a.boost ? -1 : 1));

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto rounded-xl  dark:bg-gray-800 shadow-lg  p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-100">View All Issues</h1>
        <div className="overflow-x-auto rounded-lg ">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 font-bold text-[16px] ">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Issue Details</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4 text-center">Action Panel</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {sortedIssues.map((issue, index) => (
                <tr
                  key={issue._id}
                  className={`hover:bg-blue-50  dark:hover:bg-blue-900 transition-colors ${issue.boost ? "bg-yellow-50 dark:bg-yellow-900" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <td className="p-2 text-gray-500 font-medium  dark:text-gray-300">{index + 1}</td>
                  <td className="p-2">
                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px]">{issue.title}</p>
                    <span className="text-[12px] text-gray-700 dark:text-gray-300 tracking-widest">{issue.category}</span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-3 py-1.5 rounded text-white text-[12px] ${
                        issue.priority?.toLowerCase() === "high"
                          ? "bg-red-600"
                          : issue.priority?.toLowerCase() === "low"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1.5 rounded-full text-[12px] font-bold ${
                        statusColors[issue.status] || "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="p-2">
                    {issue.assignedStaff ? (
                      <span className="font-bold text-[16px]  text-blue-600 dark:text-blue-400">{issue.assignedStaff.name}</span>
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300 italic text-[14px]">Not Assigned</span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      {!issue.assignedStaff && issue.status === "pending" ? (
                        <>
                          <button
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-blue-700 shadow-sm"
                            onClick={() => setSelectedIssue(issue)}
                          >
                            Assign Staff
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-red-600 shadow-sm"
                            onClick={() => handleReject(issue._id)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-xs font-medium">—--—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedIssue && (
        <AssignStaffModal
          issue={selectedIssue}
          close={() => setSelectedIssue(null)}
          axiosSecure={axiosSecure}
          allIssues={issues}
          onAssignSuccess={() => queryClient.invalidateQueries(["allIssues"])}
        />
      )}
    </div>
  );
};

export default ViewAllIssues;
