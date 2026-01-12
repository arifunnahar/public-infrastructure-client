import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo2 from '../../../assets/images/logo2.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal transition-colors duration-300
      bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-10 mt-10">

      {/* Column 1 */}
      <nav className="mb-6 sm:mb-0">
        <Link to="/" className="font-bold text-xl flex items-center mb-4">
          <img src={logo2} alt="CivicHelp Desk Logo" className="w-6 h-6 mr-1" />
          CivicHelp Desk
        </Link>
        <p className="text-gray-700 dark:text-gray-300 max-w-xs">
          Public Infrastructure Platform is dedicated to improving urban services including roads, water, electricity, and smart city development. We provide reliable, real-time updates and expert support for all our projects.
        </p>
      </nav>

      {/* Column 3 - Links */}
      <nav className="mb-6 sm:mb-0">
        <h6 className="footer-title font-semibold mb-2">Resources</h6>
        <Link to="/about" className="block link-hover mb-1 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">About </Link>
        <Link to="/contact-us" className="block link-hover mb-1 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">Contact Us</Link>
      </nav>

      {/* Column 4 - Social */}
      <nav>
        <h6 className="footer-title font-semibold mb-2">Social</h6>
        <div className="grid grid-flow-col gap-4">
          {/* Facebook */}
          <a href="https://www.facebook.com/li.pi.859075/" target="_blank" rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            <FaFacebookF size={24} />
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400">
            <FaInstagram size={24} />
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/arifun-nahar-lipi-web/" target="_blank" rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-300">
            <FaLinkedinIn size={24} />
          </a>

          {/* GitHub */}
          <a href="https://github.com/arifunnahar" target="_blank" rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.933 0-1.31.468-2.382 1.235-3.222-.123-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403c1.02.005 2.045.137 3.003.403 2.288-1.552 3.294-1.23 3.294-1.23.654 1.649.242 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.625-5.475 5.922.43.372.815 1.102.815 2.222 0 1.605-.015 2.896-.015 3.286 0 .322.216.698.825.58C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </nav>

    </footer>
  );
};

export default Footer;
