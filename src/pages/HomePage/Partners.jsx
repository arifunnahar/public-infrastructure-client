import React from "react";

const partners = [
  "City Government",
  "Infrastructure Authority",
  "Public Health Department",
  "Urban Development Corp",
];

export default function Partners() {
  return (
    <section
      className="py-16 transition-colors duration-300
      bg-gray-50 dark:bg-gray-900 mt-5 dark:rounded-xl"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Partners
        </h2>

        <div className="flex flex-wrap justify-center gap-8 items-center">
          {partners.map((p, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border transition
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              shadow hover:shadow-lg dark:hover:shadow-xl w-40"
            >
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                {p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
