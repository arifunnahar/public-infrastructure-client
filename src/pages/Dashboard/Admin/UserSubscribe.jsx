import React, { useState } from "react";
import SubscriptionModal from "../Admin/SubscribeModal.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import axios from "axios";
import { Link } from "react-router";

const UserSubscribe = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubscribe = async () => {
    if (!user?.email) {
      setError("User not logged in!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://public-infrastructure-server.vercel.app/create-checkout-subscribe-session",
        {
          email: user.email,
          amount: 1000,
        }
      );

      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError(
        err.response?.data?.message || "Subscription failed. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50  dark:bg-gray-800 mt-10">
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-10 max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800  dark:text-gray-100 mb-4">
          Subscribe Now!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Pay 1000 to become a premium user.</p>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        <div className="flex gap-4">
          <button
            onClick={openModal}
            className="bg-purple-600 ml hover:bg-purple-700 text-white font-semibold px-4 py-3 rounded-xl"
          >
            Subscribe Now
          </button>
          <Link
            to="/"
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-3 rounded-xl"
          >
            Go to Home
          </Link>
        </div>
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubscribe={handleSubscribe}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UserSubscribe;
