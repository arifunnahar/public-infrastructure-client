import React from "react";
import { FaMapMarkerAlt, FaBoxTissue } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { AiFillLike } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const IssueCard = ({ issue = {} }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    _id,
    title,
    category,
    location,
    priority,
    status = "Pending",
    imageUrl,
    created_at,
    isBoosted,
    reportedBy,
  } = issue;

  /* user block status*/
  const { data: blockInfo = { isBlocked: false } } = useQuery({
    queryKey: ["userBlockStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/users/status/${user.email}`
      );
      return data;
    },
  });

  /* upvote count*/
  const { data: voteInfo = { totalVotes: 0 } } = useQuery({
    queryKey: ["upvoteCount", _id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/upvote-count?id=${_id}`
      );
      return data;
    },
  });

  /* upvote mutation */
  const createVote = useMutation({
    mutationFn: async (voteData) => {
      const { data } = await axios.post(
        `http://localhost:3000/upvote`,
        voteData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upvoteCount", _id]);
      toast.success("Upvote added successfully!");
    },
    onError: (error) => {
      if (error.response?.data === "already upVoted") {
        toast.error("You have already upvoted this!");
      }
      if (error.response?.data === "blocked") {
        toast.error("Your account is blocked. You cannot upvote!");
      }
    },
  });





  //---------- upvote handle-------------------
  const handleUpvote = () => {
    if (!user?.email) {
      toast.error("Please login to upvote!");
      return navigate("/login");
    }

    if (blockInfo?.isBlocked) {
      return toast.error("Your account is blocked! You cannot upvote");
    }

    if (user.email === reportedBy) {
      return toast.error("You cannot upvote your own issue!");
    }

    const upvoteData = {
      productId: _id,
      title,
      category,
      userEmail: user.email,
    };

    createVote.mutate(upvoteData);
  };

  // Priority Color
  const getPriorityColor = (priority) => {
    if (!priority) return "bg-yellow-400 text-white";
    switch (priority.toLowerCase().trim()) {
      case "high":
        return "bg-red-400 text-white";
      default:
        return "bg-yellow-400 text-white"; 
    }
  };

  // Priority Text
  const getPriorityText = (priority) => {
    if (!priority) return "Normal";
    return priority.toLowerCase().trim() === "high" ? "High" : "Normal";
  };

  // Status Badge Color
  const getStatusColor = (status) => {
    if (!status) return "bg-yellow-400 text-white";
    switch (status.toLowerCase().trim()) {
      case "pending":
        return "bg-orange-500 text-white";
      case "rejected":
        return "bg-red-600 text-white";
      case "in-progress":
        return "bg-yellow-400 text-white";
      case "working":
        return "bg-blue-400 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      case "closed":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };


  return (
    <motion.div
      className="card bg-gray-200  dark:bg-gray-900 shadow-md rounded-2xl overflow-hidden border border-yellow-200"
      whileHover={{ scale: 1.05 }}
    >
      <figure className="p-2 relative">
        <img
          src={imageUrl || "https://via.placeholder.com/400"}
          alt={title}
          className="h-52 w-full rounded-xl object-cover"
        />

        <div
          className={`absolute top-3 left-3 px-3 py-1 text-sm rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status}
        </div>

          {/* Boosted Badge */}
        {isBoosted && (
          <span className="absolute top-3 right-3 bg-purple-400 text-white px-2 py-1 text-xs rounded-full shadow-md">
            Boosted
          </span>
        )}
      </figure>

      <div className="card-body px-5 py-4 space-y-2">
        <Toaster position="top-center" />

        <h2 className="text-lg font-semibold flex gap-2">
          <FaBoxTissue /> {title}
        </h2>

        <div className="flex gap-2">
          <span className="px-2 py-1 text-xs bg-blue-400 text-white rounded-full">
            {category}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
              priority
            )}`}
          >
            {getPriorityText(priority)}
          </span>
        </div>

        <p className="flex items-center gap-1 text-sm">
          <FaMapMarkerAlt /> {location}
        </p>

        <p className="flex items-center gap-2 text-sm">
          <MdDateRange />
          {created_at
            ? format(new Date(created_at), "MMM dd, yyyy")
            : "Unknown Date"}
        </p>

        <div className="flex justify-between mt-3">
          <Link
            to={`/issues/${_id}`}
            className="btn btn-sm bg-blue-500 text-white rounded-full"
          >
            View Details
          </Link>

          <button
            onClick={handleUpvote}
            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center gap-2"
          >
            <AiFillLike />
            <span>{voteInfo.totalVotes}</span>
            Upvote
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default IssueCard;
