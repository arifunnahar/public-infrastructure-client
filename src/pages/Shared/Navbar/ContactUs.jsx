import React from "react";

const ContactUs = () => {
  return (
    <section
      className="max-w-4xl mx-auto mt-20 px-6 py-12 rounded-xl
      bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Contact Us
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg">
        Feel free to reach out to us anytime. Here is our contact information.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300">
        {/* Address */}
        <div className="p-5 rounded-xl shadow-sm transition
          bg-green-50 dark:bg-green-900/30">
          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            📍 Address
          </h4>
          <p className="mt-2">Dhaka, Bangladesh</p>
        </div>

        {/* Phone */}
        <div className="p-5 rounded-xl shadow-sm transition
          bg-green-50 dark:bg-green-900/30">
          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            📞 Phone
          </h4>
          <p className="mt-2">+880 1234-567890</p>
        </div>

        {/* Email */}
        <div className="p-5 rounded-xl shadow-sm transition
          bg-green-50 dark:bg-green-900/30">
          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            📧 Email
          </h4>
          <p className="mt-2">support.help@example.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
