import React from "react";

const faqs = [
  {
    question: "How can I report an infrastructure issue?",
    answer: "Register as a citizen and use the reporting feature to submit issues.",
  },
  {
    question: "Is the data reliable?",
    answer: "Yes, all data is verified by government authorities.",
  },
  {
    question: "Can I track my report?",
    answer: "Absolutely! You can get real-time updates on your reported issues.",
  },
];

export default function FAQ() {
  return (
    <section
      className="py-16 transition-colors duration-300
      bg-gray-100 dark:bg-gray-900 mt-5 dark:rounded-xl"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          FAQ
        </h2>

        <div className="max-w-3xl mx-auto space-y-4 text-left">
          {faqs.map((f, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border transition
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              shadow hover:shadow-lg dark:hover:shadow-xl"
            >
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {f.question}
              </h4>

              <p className="text-gray-600 dark:text-gray-400">
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
