import React from "react";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="p-4 bg-gray-800 text-white flex flex-col items-center">
      <div className="mb-4">
        &copy; {new Date().getFullYear()} KanbanKit. All rights reserved.
      </div>
      <div className="mb-4 text-lg">
        Built with ❤️ by &nbsp;
        <span className="text-xl font-bold hover:shadow-sm rounded-sm hover:shadow-pink-300/25 hover:scale-125">
          Lavish Palia
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a
          href="https://www.linkedin.com/in/lavish-palia/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-all hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaLinkedinIn className="text-xl" />
        </a>
        <a
          href="https://github.com/LavishPalia"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-all hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaGithub className="text-xl" />
        </a>
        <a
          href="https://www.instagram.com/lavish165/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-all hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaInstagram className="text-xl" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
