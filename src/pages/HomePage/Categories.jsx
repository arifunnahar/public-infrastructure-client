import React from "react";

const categories = [
  "Roads & Highways",
  "Bridges & Flyovers",
  "Hospitals & Health Centers",
  "Schools & Colleges",
  "Water & Sanitation",
  "Electricity & Energy",
  "Public Transport",
  "Parks & Public Spaces",
];

export default function Categories() {
  return (
    <section
      className="py-16 transition-colors duration-300
      bg-white dark:bg-gray-900 mt-5 dark:rounded-xl"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full font-medium transition
              bg-blue-100 text-blue-800
              dark:bg-blue-900/40 dark:text-blue-300
              hover:scale-105"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
