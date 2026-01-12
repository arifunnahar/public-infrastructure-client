import React from "react";

const stats = [
  { number: "1,250+", label: "Total Projects" },
  { number: "350+", label: "Public Hospitals" },
  { number: "5,000+ km", label: "Mapped Roads" },
  { number: "100,000+", label: "Registered Citizens" },
  { number: "18,000+", label: "Issues Resolved" },
];

export default function Statistics() {
  return (
    <section
      className="py-16 transition-colors duration-300
      bg-blue-50 dark:bg-gray-900 mt-5 dark:rounded-xl"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Statistics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border transition
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              shadow hover:shadow-lg dark:hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-2
                text-blue-600 dark:text-blue-400">
                {stat.number}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
