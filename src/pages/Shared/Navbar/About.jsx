import React from "react";

const About = () => {
  return (
    <section
      className="max-w-5xl mx-auto px-6 py-12 mt-20 rounded-xl
      bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        About Us
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl">
        We provide reliable, modern, and sustainable public infrastructure services
        with transparency and efficiency.
      </p>

      {/* Single Page Content */}
      <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Our Story
          </h3>
          <p>
            We began with a simple promise — to build safe, modern, and impactful
            infrastructure that improves everyday life. Over time, our dedication to
            quality and innovation has earned the trust of communities and partners.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Mission
          </h3>
          <p>
            Our mission is to create sustainable and people-centric development using
            smart planning, efficient management, and top-quality engineering.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Success
          </h3>
          <p>
            From urban development to digital infrastructure, we have successfully
            delivered numerous projects on time with high standards.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Team & Others
          </h3>
          <p>
            Our experienced engineers, planners, designers, and management team work
            together to ensure quality, transparency, and long-term value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
