import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="py-16 rounded-2xl transition-colors duration-300
      bg-gray-200 dark:bg-gray-800
      text-gray-800 dark:text-gray-100 mt-5"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Report a Public Issue
        </h2>

        <p className="mb-8 text-gray-700 dark:text-gray-300">
          Help us improve public infrastructure in your community. Report issues easily and track their progress.
        </p>

        <button
          onClick={() => navigate("/report")}
          className="px-6 py-3 rounded-lg font-semibold transition
          bg-blue-500 hover:bg-blue-600
          dark:bg-blue-400 dark:hover:bg-blue-500
          text-white shadow-md hover:shadow-lg"
        >
          Report Now
        </button>
      </div>
    </section>
  );
};

export default CTASection;
