import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ReportIssueForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [limitExceeded, setLimitExceeded] = useState(false);

  // Load user info
  const { data: userInfo = {} } = useQuery({
    queryKey: ['userInfo', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Load user issues
  const { data: userIssues = [] } = useQuery({
    queryKey: ['userIssues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Block Check 
  const isBlocked = userInfo?.isBlocked;

  // Check free user limit
  useEffect(() => {
    const isFreeUser = !userInfo?.subscription || userInfo.subscription === "free";
    if (isFreeUser && userIssues.length >= 3) {
      setLimitExceeded(true);
      if (!isBlocked) toast.error("Free users can report only 3 issues. Please subscribe.");
    } else {
      setLimitExceeded(false);
    }
  }, [userInfo, userIssues, isBlocked]);

  const handleReport = async (data, e) => {
    e.preventDefault();

   
    if (isBlocked) {
      toast.error("Your account is restricted. You cannot submit issues.");
      return;
    }

    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append('image', imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        formData
      );
      const imageUrl = imgRes.data.data.url;

      const issueInfo = {
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        reportedBy: user.email,
        priority: 'normal',
        imageUrl,
        status: 'pending',
        assignedStaff: null,
        createdAt: new Date()
      };

      const res2 = await axiosSecure.post('/issues', issueInfo);

      if (res2.data.message === "Free user issue limit reached") {
        toast.error(res2.data.message);
        navigate(res2.data.redirect || '/dashboard/profile');
        return;
      }

      if (res2.data.insertedId) {
        toast.success('Issue reported successfully!');
        navigate('/dashboard/my-issues-page');
        reset();
      }
    } catch (err) {
      if (err.response?.status === 400 && err.response.data.message === "Free user issue limit reached") {
        toast.error(err.response.data.message);
        navigate(err.response.data.redirect || '/dashboard/profile');
      } else {
        console.error(err);
        toast.error('Failed to report issue. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Report an Issue</h2>

      {/* **Block Warning Banner** */}
      {isBlocked && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 shadow">
          <strong className="font-bold">Account Restricted! </strong>
          <span className="block sm:inline">You have been blocked by the admin. You can only view data but cannot submit new issues.</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleReport)}
        className={`space-y-6 p-6 rounded-xl shadow ${isBlocked ? "bg-red-50" : "bg-gray-100"}`}
      >
        <div>
          <label className="block mb-2 font-medium">Issue Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="input w-full"
            placeholder="Issue Title"
            disabled={limitExceeded || isBlocked}
          />
          {errors.title && <p className="text-red-500">Title is required.</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Issue Category</label>
          <select
            {...register('category', { required: true })}
            className="select w-full"
            disabled={limitExceeded || isBlocked} // **Disabled if blocked**
          >
            <option value="">Select Category</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Garbage">Garbage</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity">Electricity</option>
            <option value="Traffic">Traffic</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="text-red-500">Category is required.</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium">Location</label>
          <input
            type="text"
            {...register('location', { required: true })}
            className="input w-full"
            placeholder="Location"
            disabled={limitExceeded || isBlocked} // **Disabled if blocked**
          />
          {errors.location && <p className="text-red-500">Location is required.</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="textarea w-full"
            rows="4"
            placeholder="Describe the issue"
            disabled={limitExceeded || isBlocked} // **Disabled if blocked**
          ></textarea>
          {errors.description && <p className="text-red-500">Description is required.</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Issue Image</label>
          <input
            type="file"
            {...register('image', { required: true })}
            className="file-input w-full"
            accept="image/*"
            disabled={limitExceeded || isBlocked} // **Disabled if blocked**
          />
          {errors.image && <p className="text-red-500">Image is required.</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={limitExceeded || isBlocked}
          className={`btn w-full mt-4 ${isBlocked ? "btn-error" : "btn-neutral"}`}
        >
          {isBlocked ? "Submission Restricted" : "Submit Issue"}
        </button>

        {/* Subscribe Button (Shown only if limit exceeded and not blocked) */}
        {!isBlocked && limitExceeded && (
          <div className="mt-4 text-center">
            <p className="text-red-500 mb-2">
              Free users can report only 3 issues.
            </p>
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="btn btn-primary"
            >
              Subscribe Now
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReportIssueForm;