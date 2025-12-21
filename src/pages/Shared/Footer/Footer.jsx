import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-gray-200 text-gray-800 p-10 mt-10">

      {/* Column 1 */}
      <nav>
        <h6 className="footer-title text-gray-800">Public Infrastructure</h6>
        <a className="link link-hover">Road Development</a>
        <a className="link link-hover">Water Supply</a>
        <a className="link link-hover">Electricity Services</a>
        <a className="link link-hover">Urban Planning</a>
      </nav>

      {/* Column 2 */}
      <nav>
        <h6 className="footer-title text-gray-800">Company</h6>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Press Releases</a>
      </nav>

      {/* Column 3 */}
      <nav>
        <h6 className="footer-title text-gray-800">Projects</h6>
        <a className="link link-hover">Bridge Construction</a>
        <a className="link link-hover">Metro Rail Expansion</a>
        <a className="link link-hover">Solar Energy Plant</a>
        <a className="link link-hover">Smart City Development</a>
      </nav>

      {/* Column 4 */}
      <nav>
        <h6 className="footer-title text-gray-800">Social</h6>
        <div className="grid grid-flow-col gap-4">

          {/* Facebook */}
          <a className="text-gray-800 hover:text-blue-500">
            <FaFacebookF size={24} />
          </a>

          {/* Instagram */}
          <a className="text-gray-800 hover:text-pink-500">
            <FaInstagram size={24} />
          </a>

          {/* LinkedIn */}
          <a className="text-gray-800 hover:text-blue-400">
            <FaLinkedinIn size={24} />
          </a>

        </div>
      </nav>

    </footer>
  );
};

export default Footer;
