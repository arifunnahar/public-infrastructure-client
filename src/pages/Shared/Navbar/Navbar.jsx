import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';
import logo2 from '../../../assets/images/logo2.png'

import avatarImg from '../../../assets/images/placeholder.jpg'; 

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);






  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };




  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };



  return (
    <div className="fixed w-full dark:bg-gray-900 dark:text-white  z-10 shadow-sm">
      <div className="py-4 px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
       
          <Link to="/" className="font-bold text-2xl flex items-center">
      <img src={logo2} alt="CivicHelp Desk Logo" className="w-10 h-10 mr-2" />
      CivicHelp Desk
    </Link>

        {/* Center desktop */}
        <ul className="hidden md:flex gap-6 font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'text-gray-700  dark:text-white' 
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-issues"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'text-gray-700  dark:text-white'
              }
            >
              All Issues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'text-gray-700 dark:text-white'
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'text-gray-700 dark:text-white'
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* User dropdown */}

            

        <div className='flex items-center gap-4'>
          
          <input
            type="checkbox"
            className="toggle"
            checked={theme === "dark"}
            onChange={(e) => handleTheme(e.target.checked)}
          />


        <div className="relative">
           
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:p-2 border border-neutral-200 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu size={20} />
            <img
              className="rounded-full w-6 h-6 md:w-8 md:h-8 block"
              src={user && user.photoURL ? user.photoURL : avatarImg}
              alt="profile"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* .......................... */}


           

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white dark:bg-gray-900  rounded-xl shadow-md overflow-hidden text-sm z-20">
              <div className="flex flex-col">

                {/* Mobile links */}
                <div className="flex flex-col md:hidden">
                  <Link
                    to="/"
                    className="px-4 py-2 hover:bg-neutral-100 transition font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/all-issues"
                    className="px-4 py-2 hover:bg-neutral-100 transition font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    All Issues
                  </Link>
                  <Link
                    to="/about"
                    className="px-4 py-2 hover:bg-neutral-100 transition font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact-us"
                    className="px-4 py-2 hover:bg-neutral-100 transition font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>

                
                {/* User actions */}
                {user ? (
                  <>
              
                    <div className="px-4 py-2 font-bold text-lg  text-green-800 border-b bg-blue-200 dark:bg-gray-900">
                      {user.displayName ? user.displayName : "User"}
                    </div>

                    <Link
                      to="/dashboard"
                      className="px-4 py-2 hover:bg-blue-200  bg-blue-100 transition font-semibold dark:bg-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <div
                      onClick={handleLogOut}
                      className="px-4 py-2 hover:bg-blue-200 bg-blue-100 transition font-semibold cursor-pointer dark:bg-gray-900"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 hover:bg-neutral-200 transition font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 hover:bg-neutral-200 transition font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
</div>


      </div>
    </div>
  );
};

export default Navbar;
