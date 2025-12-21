import React from 'react';
import { FaMapMarkerAlt, FaTools, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaMapMarkerAlt className="text-4xl text-blue-300 mb-4" />,
      title: "Report an Issue",
      description: "Identify a public infrastructure issue in your area and submit a report.",
    },
    {
      icon: <FaTools className="text-4xl text-blue-300 mb-4" />,
      title: "Assessment & Action",
      description: "Our team inspects the reported issue and plans the necessary action.",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-blue-300 mb-4" />,
      title: "Issue Resolved",
      description: "The problem is fixed, and you get updates on the resolution.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
