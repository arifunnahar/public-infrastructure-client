import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaExclamationCircle,
  FaUser,
  FaClock,
} from "react-icons/fa";
import { AiFillLike } from "react-icons/ai"; 
import { MdPriorityHigh, MdEdit, MdDelete, MdBolt } from "react-icons/md";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { format } from "date-fns";
import useAxiosSecure from "../hooks/useAxiosSecure";
import BoostModal from "../Dashboard/Admin/BoostModal";
import useAuth from "../hooks/useAuth";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [isBoostOpen, setIsBoostOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    priority: "Normal",
  });



  // block part is here 
  const { data: blockInfo = { isBlocked: false } } = useQuery({
    queryKey: ["userBlockStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/status/${user?.email}`);
      return data;
    },
  });
  const isBlocked = blockInfo?.isBlocked || false;



  

  const formatDate = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? "-" : format(d, "PPP");
  };

  const getPriorityColor = (value) => {
    if (!value) return "text-gray-500";
    const val = value.toLowerCase();
    if (val === "high") return "text-red-600";
    if (val === "normal") return "text-yellow-500";
    return "text-gray-500";
  };

  const { data: issue, isLoading, isError, error } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => (await axiosSecure.get(`/issues/${id}`)).data,
    refetchOnWindowFocus: false,
  });

  const { data: voteInfo = { totalVotes: 0 } } = useQuery({
    queryKey: ["upvoteCount", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/upvote-count?id=${id}`);
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedIssue) =>
      (await axiosSecure.patch(`/issues/${id}`, updatedIssue)).data,
    onSuccess: (data) => {
      queryClient.setQueryData(["issue", id], (old) => ({
        ...old,
        ...data,
        timeline: [
          { message: "Issue updated", type: "update", time: new Date() },
          ...(old?.timeline ? [...old.timeline] : []),
          queryClient.refetchQueries(["issues", id]),
        ],
      }));
      toast.success("Issue Updated Successfully!", { position: "top-center" });
      setIsEditOpen(false);
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Update failed", { position: "top-center" }),
  });

  const boostMutation = useMutation({
    mutationFn: async () => (await axiosSecure.patch(`/issues/${id}/boost`)).data,
    onSuccess: (data) => {
      queryClient.setQueryData(["issue", id], (old) => ({
        ...old,
        ...data,
        priority: "High",
        isBoosted: true,
        timeline: [
          { message: "Issue boosted", type: "boost", time: new Date() },
          ...(old?.timeline ? [...old.timeline] : []),
        ],
      }));
      toast.success("Issue Boosted Successfully!", { position: "top-center" });
      setIsBoostOpen(false);
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Boost failed", { position: "top-center" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => await axiosSecure.delete(`/issues/${id}`),
    onSuccess: () => {
      queryClient.removeQueries(["issue", id]);
      toast.success("Issue Deleted Successfully!", { position: "top-center", duration: 2000 });
      setTimeout(() => navigate("/all-issues"), 2000);
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Delete failed", { position: "top-center" }),
  });

  const openEditModal = () => {
    setEditData({
      title: issue.title,
      category: issue.category,
      location: issue.location,
      description: issue.description,
      priority: issue.priority || "Normal",
    });
    setIsEditOpen(true);
  };

  if (isLoading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (isError)
    return <div className="text-center py-20 text-red-600">Error: {error.message}</div>;
  if (!issue) return <div className="text-center py-20">Issue not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-200 dark:bg-gray-800 rounded-2xl mt-20">
      <Toaster position="top-center" reverseOrder={false} />

      <Dialog open={isBoostOpen} onClose={() => setIsBoostOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-md bg-white rounded-xl p-8 space-y-4">
            <DialogTitle className="text-xl font-bold">Boost Issue (100TK)</DialogTitle>
            <Description>When an issue is boosted, it will appear at the top.</Description>
            <div className="flex justify-end gap-4">
              <button className="px-5 py-2 bg-gray-300 rounded-lg" onClick={() => setIsBoostOpen(false)}>Cancel</button>
              <button className="px-5 py-2 bg-amber-600 text-white rounded-lg" onClick={() => boostMutation.mutate()}>
                {boostMutation.isPending ? "Boosting..." : "Confirm"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full bg-white dark:bg-gray-700 p-8 rounded-xl space-y-6">
            <DialogTitle className="text-2xl font-bold">Edit Issue</DialogTitle>
            <div className="space-y-4">
              <label className="font-semibold">Title</label>
              <input type="text" className="w-full p-3 border rounded" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
              <label className="font-semibold">Category</label>
              <input type="text" className="w-full p-3 border rounded" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
              <label className="font-semibold">Location</label>
              <input type="text" className="w-full p-3 border rounded" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
              <label className="font-semibold">Description</label>
              <textarea className="w-full p-3 border rounded" rows="4" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
            </div>
            <div className="flex justify-end gap-4">
              <button className="px-5 py-2 bg-gray-300 rounded" onClick={() => setIsEditOpen(false)}>Cancel</button>
              <button className="px-5 py-2 bg-blue-600 text-white rounded" onClick={() => updateMutation.mutate(editData)}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-md bg-white dark:bg-gray-700 p-8 rounded-xl">
            <DialogTitle className="text-xl font-bold text-red-600">Delete Issue</DialogTitle>
            <p className="mt-3">Are you sure you want to delete this issue permanently?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button className="px-5 py-2 bg-gray-300 rounded" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
              <button className="px-5 py-2 bg-red-600 text-white rounded" onClick={() => deleteMutation.mutate()}>
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="flex flex-col lg:flex-row gap-12 mt-4">
        <div className="flex-1">
          {issue.imageUrl ? (
            <img src={issue.imageUrl} className="w-full h-150 object-cover rounded-xl shadow-xl" alt="Issue" />
          ) : (
            <div className="h-96 bg-gray-300 flex items-center justify-center rounded-xl">No Image Available</div>
          )}
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">{issue.title}</h1>
          <p className="text-gray-800 dark:text-gray-200 font-semibold text-[22px]">Category: {issue.category}</p>
          <p className="text-lg">{issue.description}</p>

          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3"><FaMapMarkerAlt /> {issue.location}</div>
            <div className="flex items-center gap-3"><FaUser /> {issue.reportedBy}</div>
            <div className="flex items-center gap-3"><FaExclamationCircle /> {issue.status}</div>
            <div className="flex items-center gap-3 text-green-600 font-bold">
              <AiFillLike className="text-xl" /> Total Upvotes: {voteInfo.totalVotes}
            </div>
            <div className="flex items-center gap-3">
              <MdPriorityHigh className={`text-xl ${getPriorityColor(issue.priority)}`} />
              <span className={`font-bold ${getPriorityColor(issue.priority)}`}>
                {issue.priority?.toLowerCase() === "high" ? "High" : issue.priority?.toLowerCase() === "normal" ? "Normal" : issue.priority}
              </span>
            </div>
            <div className="flex items-center gap-3"><FaClock /> {formatDate(issue.created_at)}</div>
          </div>

          {(issue.timeline || []).length > 0 && (
            <div className="mt-6 p-4 bg-amber-100 dark:bg-gray-700 rounded-lg shadow space-y-2">
              <h2 className="font-bold text-lg">Timeline</h2>
              {issue.timeline
                .slice()
                .sort((a, b) => new Date(b.date || b.time || b.createdAt) - new Date(a.date || a.time || a.createdAt))
                .map((t, idx) => (
                  <div key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    {t.action === "boost" && <MdBolt className="text-amber-600" />}
                    <span>{new Date(t.date || t.time || t.createdAt).toLocaleString()} - {t.message}</span>
                  </div>
                ))}
            </div>
          )}

          <div className="flex gap-4 pt-4 flex-wrap">
            {!issue.isBoosted && issue.priority.toLowerCase() !== "high" ? (
              <button
                onClick={() => setIsBoostOpen(true)}
                disabled={issue.isBlocked || isBlocked} 
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white
                  ${issue.isBlocked || isBlocked 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-amber-600 hover:bg-amber-700"
                  }`}
              >
                <MdBolt /> Boost (100)
              </button>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 bg-green-400 text-white px-5 py-2 rounded-lg cursor-not-allowed"
              >
                <MdBolt /> Boosted
              </button>
            )}

            <BoostModal isOpen={isBoostOpen} closeModal={() => setIsBoostOpen(false)} issue={issue} />

            {issue.status?.toLowerCase() === "pending" && user?.email === issue.reportedBy && (
              <button
                onClick={openEditModal}
                disabled={issue.isBlocked || isBlocked} 
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white
                  ${issue.isBlocked || isBlocked 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                <MdEdit /> Edit
              </button>
            )}

            {user?.email === issue.reportedBy && (
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                <MdDelete /> Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
