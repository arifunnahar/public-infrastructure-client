import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="hero-slider mt-40 md:mt-5 lg:mt-10 pt-15">
 
      <div className="rounded-2xl overflow-hidden shadow-2xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="mySwiper rounded-2xl"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
              <img
                src="https://i.ibb.co.com/k2DCz36T/pexels-marcial-comeron-177639337-12048413.jpg"
                alt="Hero Slide 1"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                  Report Public Infrastructure Problems
                </h2>
                <p className="text-lg md:text-xl font-medium drop-shadow-md">
                  Roads, lights, drainage or any civic issue — report instantly
                </p>
               <Link
  to="/all-issues"
  className="
    px-6 py-3 mt-8 rounded-lg font-semibold
    bg-blue-500 text-white
    hover:bg-blue-700
    border-0
    dark:bg-black dark:text-white
    dark:border dark:border-white
    dark:hover:bg-gray-900
    transition duration-300
  "
>
  All Issues
</Link>


              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
              <img
                src="https://i.ibb.co.com/ndqSJK3/pexels-tom-shamberger-5308978-17605956.jpg"
                alt="Hero Slide 2"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                  Help Improve Your City
                </h2>
                <p className="text-lg md:text-xl font-medium drop-shadow-md">
                  Submit issues and track progress in real-time
                </p>
             <Link
  to="/all-issues"
  className="
    px-6 py-3 mt-8 rounded-lg font-semibold
    bg-blue-500 text-white
    hover:bg-blue-700
    border-0
    dark:bg-black dark:text-white
    dark:border dark:border-white
    dark:hover:bg-gray-900
    transition duration-300
  "
>
  All Issues
</Link>

              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
              <img
                src="https://i.ibb.co.com/DgswynbB/iliya-jokic-RM5-JTq-J4-Fh-U-unsplash.jpg"
                alt="Hero Slide 3"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                  A Smarter Way to Report City Issues
                </h2>
                <p className="text-lg md:text-xl font-medium drop-shadow-md">
                  Seamless, transparent & user-friendly reporting system
                </p>
               <Link
  to="/all-issues"
  className="
    px-6 py-3 mt-8 rounded-lg font-semibold
    bg-blue-500 text-white
    hover:bg-blue-700
    border-0
    dark:bg-black dark:text-white
    dark:border dark:border-white
    dark:hover:bg-gray-900
    transition duration-300
  "
>
  All Issues
</Link>


             
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
