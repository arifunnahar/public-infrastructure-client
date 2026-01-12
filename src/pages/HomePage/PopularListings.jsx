import React from "react";

const listings = [
  { title: "Most Used Public Hospitals", desc: "Top hospitals based on citizen usage and rating." },
  { title: "Busy Roads & Highways", desc: "Main roads and highways frequently used." },
  { title: "Important Bridges & Flyovers", desc: "Major bridges and flyovers across the city." },
  { title: "Top Public Services", desc: "Highly rated services by citizens." },
  { title: "Ongoing Mega Projects", desc: "Key development projects under progress." },
];

export default function PopularListings() {
  return (
    <section
      className="py-16 transition-colors duration-300
      bg-gray-50 dark:bg-gray-900 mt-5 dark:rounded-xl"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Popular Listings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listings.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border transition
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              shadow hover:shadow-lg dark:hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
