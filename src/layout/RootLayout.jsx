import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Banner from '../pages/Banner/Banner';
import FeaturesSection from '../pages/Shared/Footer/FeaturesSection';
import HowItWorks from '../pages/Shared/Footer/HowItWorks';
import TestimonialsSection from '../pages/Shared/Footer/TestimonialsSection';
import CTASection from '../pages/Shared/Footer/CTASection';
import HomePage from '../pages/HomePage/HomePage';

const RootLayout = () => {
  const location = useLocation();
  const homePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto mt-5">
        {homePage && <Banner />}
        <Outlet />
        {homePage && <FeaturesSection />}
         {homePage && <HowItWorks />}
        {homePage && <TestimonialsSection />}
        {homePage && <CTASection/>}
        {homePage && <HomePage/>}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
