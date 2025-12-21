import React from "react";

const ContactUs = () => {
  return (
    <section className="max-w-4xl bg-gray-100 mt-20 mx-auto rounded-xl px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
      <p className="text-gray-600 mt-2 max-w-lg">
        Feel free to reach out to us anytime. Here is our contact information.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        <div className="p-5 bg-green-50 rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-800 text-lg">📍 Address</h4>
          <p className="mt-2">Dhaka, Bangladesh</p>
        </div>

        <div className="p-5 bg-green-50 rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-800 text-lg">📞 Phone</h4>
          <p className="mt-2">+880 1234-567890</p>
        </div>

        <div className="p-5 bg-green-50 rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-800 text-lg">📧 Email</h4>
          <p className="mt-2">support.help@example.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;