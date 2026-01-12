import React from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. This platform collects only the necessary information required 
            to provide public infrastructure services and reporting.
          </p>
          <p className="text-gray-700 mb-4">
            We do not sell or share your personal information with third parties. All reports, feedback, and 
            registrations are stored securely and used only for improving city infrastructure services.
          </p>
          <p className="text-gray-700">
            By using this platform, you consent to the collection and use of your information as described 
            in this Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
