import React from "react";
import { FaMapMarkerAlt, FaTools, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaMapMarkerAlt className="text-4xl text-blue-500 dark:text-blue-400 mb-4" />,
      title: "Report an Issue",
      description: "Identify a public infrastructure issue in your area and submit a report.",
    },
    {
      icon: <FaTools className="text-4xl text-blue-500 dark:text-blue-400 mb-4" />,
      title: "Assessment & Action",
      description: "Our team inspects the reported issue and plans the necessary action.",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-blue-500 dark:text-blue-400 mb-4" />,
      title: "Issue Resolved",
      description: "The problem is fixed, and you get updates on the resolution.",
    },
  ];

  return (
    <section
      className="py-16 mt-5 dark:rounded-xl transition-colors duration-300
      bg-gray-100 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border transition duration-300
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              shadow hover:shadow-lg dark:hover:shadow-xl"
            >
              {step.icon}

              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
