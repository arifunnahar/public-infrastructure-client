import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your subscription");
  const isPayment = useRef(false);

  useEffect(() => {
    if (isPayment.current) return;
    isPayment.current = true;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");
    const email = params.get("email");

    if (!session_id || !email) {
      setStatus("error");
      setMessage("Missing subscription data.");
      setTimeout(() => navigate("/"), 2500);
      return;
    }

    axios
      .post(
        " https://public-infrastructure-server.vercel.app/subscription-success",
        {
          session_id,
          email,
        }
      )
      .then(() => {
        setStatus("success");
        setMessage(" You are now a Premium user!");
        setTimeout(() => navigate("/dashboard/profile"), 2500);
      })
      .catch(() => {
        setStatus("error");
        setMessage("Subscription verification failed.");
        setTimeout(() => navigate("/"), 2500);
      });
  }, [search, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-purple-900 px-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-8 text-center">
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Processing Payment
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we verify your subscription...
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600">
              Subscription Successful
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <p className="text-sm text-gray-400 mt-3">
              Redirecting you shortly...
            </p>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-500">
              Verification Failed
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <p className="text-sm text-gray-400 mt-3">Redirecting to home...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
