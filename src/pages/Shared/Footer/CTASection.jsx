import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-200 rounded-2xl text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Report a Public Issue</h2>
        <p className="mb-8">
          Help us improve public infrastructure in your community. Report issues easily and track their progress.
        </p>
        <button
          onClick={() => navigate('/report')}
          className="bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Report Now
        </button>
      </div>
    </section>
  );
};

export default CTASection;
