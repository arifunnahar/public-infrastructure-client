import React from "react";

const testimonials = [
  {
    name: "Lipi Akanda",
    feedback: "The local road repairs were done quickly and professionally. Great service!",
  },
  {
    name: "Arif Hossain",
    feedback: "Reporting issues with streetlights has never been easier. Very satisfied!",
  },
  {
    name: "Sofia Akter",
    feedback: "The public park maintenance team responded promptly. Highly recommend!",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      className="py-16 transition-colors duration-300
      bg-white dark:bg-gray-900 mt-5 dark:rounded-xl"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
          What Citizens Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border transition
              bg-gray-100 dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              shadow hover:shadow-lg dark:hover:shadow-xl"
            >
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                &quot;{testi.feedback}&quot;
              </p>

              <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                {testi.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
