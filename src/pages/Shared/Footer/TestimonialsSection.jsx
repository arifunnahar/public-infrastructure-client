import React from 'react';

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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12">What Citizens Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-xl shadow">
              <p className="text-gray-700 mb-4">&quot;{testi.feedback}&quot;</p>
              <h4 className="font-semibold text-lg">{testi.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
