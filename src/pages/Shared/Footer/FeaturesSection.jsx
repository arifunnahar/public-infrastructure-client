import React from "react";
import { CheckCircle } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Public Management",
      desc: "Real-time monitoring and smart digital solutions for better infrastructure management.",
    },
    {
      title: "Fast & Reliable Service",
      desc: "High-quality execution with on-time delivery and transparent workflow.",
    },
    {
      title: "Sustainable Development",
      desc: "Eco-friendly materials and modern planning to ensure long-term sustainability.",
    },
    {
      title: "Expert Engineering Team",
      desc: "A skilled team of engineers, planners, and specialists dedicated to quality.",
    },
    {
      title: "Secure & Compliant",
      desc: "Strict adherence to safety standards and government regulations.",
    },
    {
      title: "Digital Infrastructure",
      desc: "IoT, automation, and modern digital tools for smart city solutions.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center">Our Features</h2>
      <p className="text-gray-600 max-w-2xl text-center mx-auto mt-2">
        Explore the core features that make our infrastructure solutions modern, reliable, and efficient.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {features.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-gray-50 rounded-xl shadow-sm border hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-gray-700 font-semibold text-lg">
              <CheckCircle size={20} /> {item.title}
            </div>
            <p className="text-gray-700 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
